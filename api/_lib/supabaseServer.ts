import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../src/types/database.types.js';
import { getServerEnv, validateRequiredEnv } from './env.js';

let cachedServerClient: SupabaseClient<Database> | null = null;

/**
 * Returns a privileged Supabase client configured with the service-role key.
 * This client bypasses RLS and MUST ONLY be used on the server within authorized handlers.
 * Never expose or return this client or its key to the browser.
 */
export function getSupabaseServerClient(): SupabaseClient<Database> {
  if (cachedServerClient) {
    return cachedServerClient;
  }

  const { isValid, missing } = validateRequiredEnv();
  if (!isValid) {
    throw new Error(
      `[Serverless Backend] Missing required environment variables: ${missing.join(', ')}`
    );
  }

  const env = getServerEnv();

  cachedServerClient = createClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  return cachedServerClient;
}
