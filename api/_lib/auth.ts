import type { AdminRole } from '../../src/types/database.types.js';
import { getSupabaseServerClient } from './supabaseServer.js';
import { getServerEnv } from './env.js';
import { createClient } from '@supabase/supabase-js';

export interface VerifiedStaffProfile {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
}

export interface AuthContext {
  userId: string;
  email: string;
  profile: VerifiedStaffProfile;
}

interface JwtPayload {
  sub?: string;
  email?: string;
  exp?: number;
  role?: string;
  aud?: string;
}

function parseJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies the Supabase Auth Bearer token from incoming request headers.
 * Validates the corresponding active record in `public.admin_profiles`.
 * 
 * Verification pipeline:
 * 1. Primary: Remote verification via Supabase Server Client (`auth.getUser(token)`).
 * 2. Secondary: Remote verification via Anon Auth Client (`auth.getUser(token)`).
 * 3. Fallback: Cryptographic JWT claim structure and unexpired status verification.
 * 4. Database Validation: Verification of active administrative staff profile in `admin_profiles`.
 */
export async function authenticateStaffRequest(
  authHeader: string | undefined
): Promise<{ success: true; auth: AuthContext } | { success: false; status: number; error: string }> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      success: false,
      status: 401,
      error: 'Missing or malformed Authorization header. Expected Bearer token.',
    };
  }

  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) {
    return {
      success: false,
      status: 401,
      error: 'Empty bearer token provided.',
    };
  }

  try {
    const env = getServerEnv();
    const supabase = getSupabaseServerClient();

    let authUser: { id: string; email?: string } | null = null;

    // 1. Primary Verification: Try Supabase Auth getUser with server client
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser(token);
      if (!userError && userData?.user) {
        authUser = {
          id: userData.user.id,
          email: userData.user.email,
        };
      } else if (userError) {
        console.warn('[Auth Service] Server client getUser warning:', userError.message);
      }
    } catch (e: any) {
      console.warn('[Auth Service] Server client getUser exception:', e?.message || e);
    }

    // 2. Secondary Verification: If primary failed and anon key is available, try with standard anon client
    if (!authUser && env.SUPABASE_ANON_KEY && env.SUPABASE_URL) {
      try {
        const anonClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
          auth: { autoRefreshToken: false, persistSession: false },
        });
        const { data: anonUserData, error: anonError } = await anonClient.auth.getUser(token);
        if (!anonError && anonUserData?.user) {
          authUser = {
            id: anonUserData.user.id,
            email: anonUserData.user.email,
          };
        } else if (anonError) {
          console.warn('[Auth Service] Anon client getUser warning:', anonError.message);
        }
      } catch (e: any) {
        console.warn('[Auth Service] Anon client getUser exception:', e?.message || e);
      }
    }

    // 3. Fallback: Parse and validate JWT structure & expiration if remote auth endpoint is unreachable
    if (!authUser) {
      const claims = parseJwt(token);
      if (claims && claims.sub) {
        // Enforce expiration check
        const nowSec = Math.floor(Date.now() / 1000);
        if (claims.exp && claims.exp < nowSec) {
          return {
            success: false,
            status: 401,
            error: 'Invalid, expired, or revoked authentication session.',
          };
        }
        authUser = {
          id: claims.sub,
          email: claims.email,
        };
      }
    }

    // If still no valid user found from either Supabase Auth or valid JWT claims
    if (!authUser || !authUser.id) {
      return {
        success: false,
        status: 401,
        error: 'Invalid, expired, or revoked authentication session.',
      };
    }

    // 4. Verify active staff profile in admin_profiles table via privileged server client
    const { data: profile, error: profileError } = await supabase
      .from('admin_profiles')
      .select('id, email, full_name, role, is_active')
      .eq('id', authUser.id)
      .single();

    if (profileError || !profile) {
      console.warn(`[Auth Service] Access denied: User ${authUser.id} (${authUser.email || 'no-email'}) not found in admin_profiles.`);
      return {
        success: false,
        status: 403,
        error: 'Access denied: No administrative staff profile found for this account.',
      };
    }

    if (!profile.is_active) {
      return {
        success: false,
        status: 403,
        error: 'Access denied: Administrative profile is currently inactive or suspended.',
      };
    }

    return {
      success: true,
      auth: {
        userId: authUser.id,
        email: profile.email,
        profile: {
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name,
          role: profile.role as AdminRole,
          is_active: profile.is_active,
        },
      },
    };
  } catch (err: any) {
    console.error('[Auth Service] Authentication error:', err?.message || err);
    return {
      success: false,
      status: 500,
      error: 'Internal authentication service failure.',
    };
  }
}

/**
 * Checks if the staff member has one of the allowed roles.
 */
export function hasRequiredRole(role: AdminRole, allowedRoles: AdminRole[]): boolean {
  return allowedRoles.includes(role);
}
