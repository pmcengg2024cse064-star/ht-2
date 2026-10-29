import type { AdminRole } from '../../src/types/database.types';
import { getSupabaseServerClient } from './supabaseServer';

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

/**
 * Extracts and verifies the Supabase Auth Bearer token from incoming request headers.
 * Validates the corresponding active record in `public.admin_profiles`.
 * 
 * Rejection guarantees:
 * - Missing or invalid JWT -> 401 Unauthorized
 * - Valid Auth user with NO admin profile -> 403 Forbidden
 * - Inactive admin profile (`is_active = false`) -> 403 Forbidden
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
    const supabase = getSupabaseServerClient();

    // Verify token with Supabase Auth
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) {
      return {
        success: false,
        status: 401,
        error: 'Invalid, expired, or revoked authentication session.',
      };
    }

    const authUser = userData.user;

    // Verify active staff profile in admin_profiles table
    const { data: profile, error: profileError } = await supabase
      .from('admin_profiles')
      .select('id, email, full_name, role, is_active')
      .eq('id', authUser.id)
      .single();

    if (profileError || !profile) {
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
