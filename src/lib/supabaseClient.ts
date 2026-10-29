import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Indicates whether the Supabase public environment variables are present.
 */
export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('placeholder')
);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.info(
    '[Hackup Backend Foundation] Supabase client is unconfigured. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment to enable real database features.'
  );
}

/**
 * Supabase client instance typed with the application schema.
 * 
 * Safety Guarantee:
 * If environment variables are missing (e.g. initial preview builds or local dev without .env),
 * a fallback client is created with safe placeholder endpoints so module imports never crash the application.
 * Application logic should check `isSupabaseConfigured` before issuing write operations.
 */
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
