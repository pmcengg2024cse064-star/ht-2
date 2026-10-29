-- ==============================================================================
-- HACKUP TECHNOLOGY — API RATE LIMITING & PRODUCTION LOCKDOWN MIGRATION
-- Migration: 20261029000003_api_lockdown_and_rate_limiting.sql
-- Status: PROPOSED (Companion migration following 20261029000001 & 20261029000002)
-- Purpose:
-- 1. Creates distributed persistent rate limiting table for Vercel Serverless Functions.
-- 2. Implements atomic PostgreSQL RPC check_and_increment_rate_limit() to prevent TOCTOU race conditions.
-- 3. Enforces bounded opportunistic cleanup of expired rate limit records.
-- 4. Activates production lockdown of direct anonymous INSERTs on enquiries & registrations.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. PERSISTENT RATE LIMITING TABLE
-- Enables distributed rate limiting across serverless instances without shared memory.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  request_count INT NOT NULL DEFAULT 1,
  reset_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

-- Index on key and reset_at for high-throughput lookups and cleanup
CREATE INDEX IF NOT EXISTS idx_api_rate_limits_key_reset 
  ON public.api_rate_limits (key, reset_at);

-- Enable Row Level Security
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;

-- Defense-in-depth: Strictly block public and ordinary authenticated access
REVOKE ALL ON TABLE public.api_rate_limits FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.api_rate_limits TO service_role;

-- ------------------------------------------------------------------------------
-- 2. ATOMIC RATE LIMIT CHECK AND INCREMENT RPC FUNCTION
-- Prevents TOCTOU concurrency race conditions using PostgreSQL row-level locks
-- on INSERT ... ON CONFLICT (key) DO UPDATE.
-- Uses clock_timestamp() and make_interval() for timezone-safe monotonic evaluation.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_and_increment_rate_limit(
  p_key TEXT,
  p_limit INT,
  p_window_seconds INT
)
RETURNS TABLE (
  allowed BOOLEAN,
  remaining INT,
  reset_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_now TIMESTAMPTZ := clock_timestamp();
  v_new_reset TIMESTAMPTZ := v_now + make_interval(secs => p_window_seconds);
  v_current_count INT;
  v_current_reset TIMESTAMPTZ;
  v_allowed BOOLEAN;
  v_remaining INT;
BEGIN
  -- Strict input validation
  IF p_key IS NULL OR length(trim(p_key)) < 1 OR length(p_key) > 255 THEN
    RAISE EXCEPTION 'Invalid rate limit key: must be between 1 and 255 characters';
  END IF;

  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 10000 THEN
    RAISE EXCEPTION 'Invalid rate limit: must be between 1 and 10000';
  END IF;

  IF p_window_seconds IS NULL OR p_window_seconds < 1 OR p_window_seconds > 86400 THEN
    RAISE EXCEPTION 'Invalid rate limit window: must be between 1 and 86400 seconds';
  END IF;

  -- Atomic Upsert with row-level locking on conflict
  INSERT INTO public.api_rate_limits (key, request_count, reset_at)
  VALUES (p_key, 1, v_new_reset)
  ON CONFLICT (key) DO UPDATE
  SET 
    request_count = CASE 
      WHEN public.api_rate_limits.reset_at <= v_now THEN 1
      ELSE public.api_rate_limits.request_count + 1
    END,
    reset_at = CASE 
      WHEN public.api_rate_limits.reset_at <= v_now THEN v_new_reset
      ELSE public.api_rate_limits.reset_at
    END
  RETURNING public.api_rate_limits.request_count, public.api_rate_limits.reset_at
  INTO v_current_count, v_current_reset;

  -- Evaluate quota
  IF v_current_count <= p_limit THEN
    v_allowed := TRUE;
    v_remaining := p_limit - v_current_count;
  ELSE
    v_allowed := FALSE;
    v_remaining := 0;
  END IF;

  -- Bounded opportunistic garbage collection of expired keys:
  -- Probabilistically runs on ~1% of invocations to prevent table bloat without query overhead
  IF random() < 0.01 THEN
    DELETE FROM public.api_rate_limits
    WHERE id IN (
      SELECT id FROM public.api_rate_limits
      WHERE reset_at < (v_now - make_interval(hours => 1))
      LIMIT 100
    );
  END IF;

  RETURN QUERY SELECT v_allowed, v_remaining, v_current_reset;
END;
$$;

-- Secure function privileges: Only service_role may execute the rate limiter RPC
REVOKE ALL ON FUNCTION public.check_and_increment_rate_limit(TEXT, INT, INT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_and_increment_rate_limit(TEXT, INT, INT) TO service_role;

-- ------------------------------------------------------------------------------
-- 3. PRODUCTION CUT-OVER LOCKDOWN: REVOKE PUBLIC AND ANONYMOUS DIRECT INSERTS
-- Enforces that all public submissions must pass through verified Vercel APIs
-- (/api/enquiries/service and /api/registrations/training) with Turnstile & rate limiting.
-- Revokes from PUBLIC, anon, and authenticated to prevent inheritance via PUBLIC.
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can submit service enquiries" ON public.service_enquiries;
DROP POLICY IF EXISTS "Public can submit training registrations" ON public.training_registrations;

REVOKE INSERT ON TABLE public.service_enquiries FROM PUBLIC, anon, authenticated;
REVOKE INSERT ON TABLE public.training_registrations FROM PUBLIC, anon, authenticated;

-- Ensure service_role retains full operational privileges for serverless functions
GRANT ALL ON TABLE public.service_enquiries TO service_role;
GRANT ALL ON TABLE public.training_registrations TO service_role;

-- Note: The RPC verify_certificate_public(p_certificate_id) remains accessible to anon for public certificate checks.

-- ------------------------------------------------------------------------------
-- 4. OPERATOR VERIFICATION QUERIES (RUN IN SUPABASE SQL EDITOR AFTER MIGRATION)
-- ------------------------------------------------------------------------------
-- SELECT has_table_privilege('anon', 'public.service_enquiries', 'INSERT') AS anon_can_insert_enquiries; -- Expected: false
-- SELECT has_table_privilege('authenticated', 'public.service_enquiries', 'INSERT') AS auth_can_insert_enquiries; -- Expected: false
-- SELECT has_table_privilege('anon', 'public.training_registrations', 'INSERT') AS anon_can_insert_registrations; -- Expected: false
-- SELECT has_table_privilege('authenticated', 'public.training_registrations', 'INSERT') AS auth_can_insert_registrations; -- Expected: false
-- SELECT has_table_privilege('service_role', 'public.service_enquiries', 'INSERT') AS service_can_insert_enquiries; -- Expected: true
-- SELECT has_table_privilege('service_role', 'public.training_registrations', 'INSERT') AS service_can_insert_registrations; -- Expected: true
-- SELECT has_table_privilege('anon', 'public.api_rate_limits', 'SELECT') AS anon_can_select_rate_limits; -- Expected: false
-- SELECT has_function_privilege('anon', 'public.check_and_increment_rate_limit(text,int,int)', 'EXECUTE') AS anon_can_exec_rate_limiter; -- Expected: false
-- SELECT has_function_privilege('service_role', 'public.check_and_increment_rate_limit(text,int,int)', 'EXECUTE') AS service_role_can_exec_rate_limiter; -- Expected: true
