/**
 * Server-Side Environment Variable Management
 * 
 * Validates and exposes server-only secrets safely.
 * Never exposes values in client-side code or error messages.
 */

export interface ServerEnv {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  NOTIFICATION_RECIPIENT_EMAILS?: string[];
  IS_PRODUCTION: boolean;
}

export function getServerEnv(): ServerEnv {
  // Support either server-only SUPABASE_URL or fallback to VITE_SUPABASE_URL if set on server
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'Hackup Technology <notifications@hackuptechnology.com>';
  
  const recipientEmailsRaw = process.env.NOTIFICATION_RECIPIENT_EMAILS || '';
  const notificationRecipients = recipientEmailsRaw
    ? recipientEmailsRaw.split(',').map((e) => e.trim()).filter(Boolean)
    : [];

  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';

  return {
    SUPABASE_URL: supabaseUrl,
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
    RESEND_API_KEY: resendApiKey,
    EMAIL_FROM: emailFrom,
    NOTIFICATION_RECIPIENT_EMAILS: notificationRecipients,
    IS_PRODUCTION: isProduction,
  };
}

export function validateRequiredEnv(): { isValid: boolean; missing: string[] } {
  const missing: string[] = [];
  const env = getServerEnv();

  if (!env.SUPABASE_URL || env.SUPABASE_URL.includes('placeholder')) {
    missing.push('SUPABASE_URL');
  }
  if (!env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder')) {
    missing.push('SUPABASE_SERVICE_ROLE_KEY');
  }

  return {
    isValid: missing.length === 0,
    missing,
  };
}
