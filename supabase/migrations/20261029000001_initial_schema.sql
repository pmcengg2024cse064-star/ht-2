-- ==============================================================================
-- HACKUP TECHNOLOGY — INITIAL PRODUCTION SCHEMA MIGRATION
-- Migration: 20261029000001_initial_schema.sql
-- Status: PROPOSED (Requires review & manual execution via Supabase SQL Editor / CLI)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE enquiry_status AS ENUM (
    'NEW', 
    'CONTACTED', 
    'IN_SCOPING', 
    'PROPOSAL_SENT', 
    'WON', 
    'CLOSED'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE training_mode AS ENUM (
    'COIMBATORE_LAB', 
    'LIVE_ONLINE', 
    'HYBRID', 
    'CAMPUS_WORKSHOP'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE certificate_status AS ENUM (
    'ACTIVE', 
    'REVOKED', 
    'EXPIRED'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE certificate_category AS ENUM (
    'STUDENT_TRAINING', 
    'INDUSTRIAL_INTERNSHIP', 
    'SAFE_TO_HOST_VAPT', 
    'FACULTY_DEVELOPMENT'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE admin_role AS ENUM (
    'SUPER_ADMIN', 
    'ADMIN', 
    'AUDITOR', 
    'INSTRUCTOR'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ------------------------------------------------------------------------------
-- 3. ADMINISTRATIVE PROFILES (Linked to Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role admin_role NOT NULL DEFAULT 'ADMIN',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ------------------------------------------------------------------------------
-- 4. SERVICE ENQUIRIES (B2B VAPT, 24/7 SOC, GRC, Incident Triage)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.service_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_code TEXT UNIQUE NOT NULL,
  source_page TEXT NOT NULL,         -- 'homepage', 'b2b_modal', 'contact_page', 'estimator'
  company_name TEXT,
  contact_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  service_interest TEXT NOT NULL,
  compliance_goal TEXT,
  target_scope TEXT,
  testing_window TEXT,
  requires_nda BOOLEAN DEFAULT TRUE,
  message TEXT,
  status enquiry_status NOT NULL DEFAULT 'NEW',
  assigned_to UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  internal_notes TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ------------------------------------------------------------------------------
-- 5. TRAINING PROGRAMS & BATCHES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.training_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.training_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID NOT NULL REFERENCES public.training_programs(id) ON DELETE CASCADE,
  batch_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  mode training_mode NOT NULL,
  seats_total INT NOT NULL DEFAULT 30,
  seats_available INT NOT NULL DEFAULT 30,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ------------------------------------------------------------------------------
-- 6. TRAINING REGISTRATIONS & DEMO ENQUIRIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.training_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_code TEXT UNIQUE NOT NULL,
  candidate_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT,
  college_or_company TEXT,
  program_title TEXT NOT NULL,
  preferred_mode training_mode NOT NULL,
  status enquiry_status NOT NULL DEFAULT 'NEW',
  assigned_to UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  internal_notes TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ------------------------------------------------------------------------------
-- 7. CERTIFICATES (Tamper-Proof Verification Repository)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_id TEXT UNIQUE NOT NULL,      -- Formatted ID, e.g. HCK-2026-CS-89211
  category certificate_category NOT NULL,
  recipient_name TEXT NOT NULL,
  course_or_scope_title TEXT NOT NULL,
  institution_or_company TEXT,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  grade_or_score TEXT,
  verification_hash TEXT NOT NULL,          -- SHA-256 hash for offline / printed verification
  status certificate_status NOT NULL DEFAULT 'ACTIVE',
  revocation_reason TEXT,
  created_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ------------------------------------------------------------------------------
-- 8. AUDIT LOG (Administrative Actions & DPDP Act Data Access Compliance)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,                     -- e.g. 'EXPORT_EXCEL', 'STATUS_CHANGE', 'CERTIFICATE_ISSUED'
  entity_type TEXT NOT NULL,                -- e.g. 'service_enquiries', 'certificates'
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ------------------------------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS across all application tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if caller is active admin
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND is_active = TRUE
  );
$$;

-- Secure execution privileges on helper function
REVOKE ALL ON FUNCTION public.is_active_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_active_admin() TO authenticated, service_role;

-- Table: admin_profiles
DROP POLICY IF EXISTS "Admins can view profiles" ON public.admin_profiles;
CREATE POLICY "Admins can view profiles"
  ON public.admin_profiles FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

DROP POLICY IF EXISTS "Super Admins can manage profiles" ON public.admin_profiles;
CREATE POLICY "Super Admins can manage profiles"
  ON public.admin_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND role = 'SUPER_ADMIN'::public.admin_role AND is_active = TRUE
    )
  );

-- Table: service_enquiries
-- Public visitors (anon) can insert enquiries but CANNOT read, update or delete them.
DROP POLICY IF EXISTS "Public can submit service enquiries" ON public.service_enquiries;
CREATE POLICY "Public can submit service enquiries"
  ON public.service_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated active staff can view and manage enquiries.
DROP POLICY IF EXISTS "Admins can view and manage service enquiries" ON public.service_enquiries;
CREATE POLICY "Admins can view and manage service enquiries"
  ON public.service_enquiries FOR ALL
  TO authenticated
  USING (public.is_active_admin());

-- Table: training_programs & batches
-- Public visitors can read published programs and active batches.
DROP POLICY IF EXISTS "Public can read published training programs" ON public.training_programs;
CREATE POLICY "Public can read published training programs"
  ON public.training_programs FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Admins can manage training programs" ON public.training_programs;
CREATE POLICY "Admins can manage training programs"
  ON public.training_programs FOR ALL
  TO authenticated
  USING (public.is_active_admin());

DROP POLICY IF EXISTS "Public can view active batches" ON public.training_batches;
CREATE POLICY "Public can view active batches"
  ON public.training_batches FOR SELECT
  TO anon, authenticated
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admins can manage training batches" ON public.training_batches;
CREATE POLICY "Admins can manage training batches"
  ON public.training_batches FOR ALL
  TO authenticated
  USING (public.is_active_admin());

-- Table: training_registrations
-- Public can submit demo registrations; only admins can view.
DROP POLICY IF EXISTS "Public can submit training registrations" ON public.training_registrations;
CREATE POLICY "Public can submit training registrations"
  ON public.training_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage training registrations" ON public.training_registrations;
CREATE POLICY "Admins can view and manage training registrations"
  ON public.training_registrations FOR ALL
  TO authenticated
  USING (public.is_active_admin());

-- Table: certificates
-- Direct SELECT on certificates table is restricted to authenticated admins to prevent scraping.
DROP POLICY IF EXISTS "Admins can manage certificates" ON public.certificates;
CREATE POLICY "Admins can manage certificates"
  ON public.certificates FOR ALL
  TO authenticated
  USING (public.is_active_admin());

-- Table: audit_logs
-- Immutable logs: only readable by active admins, append-only.
DROP POLICY IF EXISTS "Admins can read audit logs" ON public.audit_logs;
CREATE POLICY "Admins can read audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

DROP POLICY IF EXISTS "System can record audit logs" ON public.audit_logs;
CREATE POLICY "System can record audit logs"
  ON public.audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (public.is_active_admin());

-- ------------------------------------------------------------------------------
-- 10. PUBLIC CERTIFICATE VERIFICATION RPC
-- Returns ONLY sanctioned public verification fields for a single certificate ID.
-- Prevents bulk enumeration and prevents PII leakage.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.verify_certificate_public(p_certificate_id TEXT)
RETURNS TABLE (
  certificate_id TEXT,
  category public.certificate_category,
  recipient_name TEXT,
  course_or_scope_title TEXT,
  institution_or_company TEXT,
  issue_date DATE,
  expiry_date DATE,
  status public.certificate_status,
  verification_hash TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT 
    c.certificate_id,
    c.category,
    c.recipient_name,
    c.course_or_scope_title,
    c.institution_or_company,
    c.issue_date,
    c.expiry_date,
    c.status,
    c.verification_hash
  FROM public.certificates c
  WHERE p_certificate_id IS NOT NULL 
    AND TRIM(p_certificate_id) <> ''
    AND UPPER(TRIM(c.certificate_id)) = UPPER(TRIM(p_certificate_id))
  LIMIT 1;
$$;

-- Grant public execution permission on the verification RPC
REVOKE ALL ON FUNCTION public.verify_certificate_public(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_certificate_public(TEXT) TO anon, authenticated;
