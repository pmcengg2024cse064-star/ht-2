/**
 * Server-Side Environment Variable Management
 * 
 * Validates and exposes server-only secrets safely.
 * Never exposes values in client-side code, responses, logs, or error messages.
 */

export interface ServerEnv {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_ANON_KEY?: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  NOTIFICATION_RECIPIENT_EMAILS?: string[];
  IS_PRODUCTION: boolean;
}

/**
 * Extracts normalized hostname from a URL string for project alignment checks.
 */
function extractHostname(urlString: string): string | null {
  try {
    const parsed = new URL(urlString);
    return parsed.hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Validates that a string is a well-formed HTTP/HTTPS URL.
 */
function isValidUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function getServerEnv(): ServerEnv {
  // Backend URL: Uses SUPABASE_URL, or falls back to VITE_SUPABASE_URL if server environment omitted it
  const rawBackendUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const supabaseUrl = rawBackendUrl.trim().replace(/\/+$/, '');

  // Backend Anon Key: Strictly for client-token verification via GoTrue
  const anonKey = (process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '').trim();

  // Strict Service Role Key: STRICTLY process.env.SUPABASE_SERVICE_ROLE_KEY.
  // NO aliases (SUPABASE_SERVICE_KEY, SUPABASE_SECRET) and NEVER falls back to the anonymous key.
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const emailFrom = process.env.EMAIL_FROM?.trim() || 'Hackup Technology <notifications@hackuptechnology.com>';
  
  const recipientEmailsRaw = process.env.NOTIFICATION_RECIPIENT_EMAILS || '';
  const notificationRecipients = recipientEmailsRaw
    ? recipientEmailsRaw.split(',').map((e) => e.trim()).filter(Boolean)
    : [];

  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';

  return {
    SUPABASE_URL: supabaseUrl,
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
    SUPABASE_ANON_KEY: anonKey,
    RESEND_API_KEY: resendApiKey,
    EMAIL_FROM: emailFrom,
    NOTIFICATION_RECIPIENT_EMAILS: notificationRecipients,
    IS_PRODUCTION: isProduction,
  };
}

export function validateRequiredEnv(): { isValid: boolean; missing: string[]; errors: string[] } {
  const missing: string[] = [];
  const errors: string[] = [];
  const env = getServerEnv();

  // 1. SUPABASE_URL validation
  if (!env.SUPABASE_URL || env.SUPABASE_URL.includes('placeholder')) {
    missing.push('SUPABASE_URL');
    errors.push('SUPABASE_URL is required and must not be a placeholder.');
  } else if (!isValidUrl(env.SUPABASE_URL)) {
    errors.push('SUPABASE_URL must be a valid http:// or https:// URL.');
  }

  // 2. SUPABASE_SERVICE_ROLE_KEY validation
  if (!env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder')) {
    missing.push('SUPABASE_SERVICE_ROLE_KEY');
    errors.push('SUPABASE_SERVICE_ROLE_KEY is required and must not be a placeholder.');
  } else {
    // Ensure service role key was not accidentally set to the anon key
    if (env.SUPABASE_ANON_KEY && env.SUPABASE_SERVICE_ROLE_KEY === env.SUPABASE_ANON_KEY) {
      errors.push('SUPABASE_SERVICE_ROLE_KEY cannot be identical to SUPABASE_ANON_KEY. A privileged service_role key is required.');
    }
  }

  // 3. Project alignment: If both SUPABASE_URL and VITE_SUPABASE_URL are defined, ensure they target the same project
  const rawBackendUrl = process.env.SUPABASE_URL?.trim();
  const rawFrontendUrl = process.env.VITE_SUPABASE_URL?.trim();
  if (rawBackendUrl && rawFrontendUrl) {
    const backendHost = extractHostname(rawBackendUrl);
    const frontendHost = extractHostname(rawFrontendUrl);
    if (backendHost && frontendHost && backendHost !== frontendHost) {
      errors.push(`SUPABASE_URL (${backendHost}) and VITE_SUPABASE_URL (${frontendHost}) point to different hosts. Both must point to the same Supabase project.`);
    }
  }

  return {
    isValid: missing.length === 0 && errors.length === 0,
    missing,
    errors,
  };
}
