-- ==============================================================================
-- HACKUP TECHNOLOGY — SECURITY REFINEMENTS & RBAC ENFORCEMENT
-- Migration: 20261029000002_security_refinements.sql
-- Status: PROPOSED (Companion migration following 20261029000001_initial_schema.sql)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. TIMESTAMP AUTOMATION TRIGGER
-- Ensures updated_at is automatically updated on every row modification.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon;

DROP TRIGGER IF EXISTS tr_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER tr_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_service_enquiries_updated_at ON public.service_enquiries;
CREATE TRIGGER tr_service_enquiries_updated_at
  BEFORE UPDATE ON public.service_enquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_training_programs_updated_at ON public.training_programs;
CREATE TRIGGER tr_training_programs_updated_at
  BEFORE UPDATE ON public.training_programs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_training_batches_updated_at ON public.training_batches;
CREATE TRIGGER tr_training_batches_updated_at
  BEFORE UPDATE ON public.training_batches
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_training_registrations_updated_at ON public.training_registrations;
CREATE TRIGGER tr_training_registrations_updated_at
  BEFORE UPDATE ON public.training_registrations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_certificates_updated_at ON public.certificates;
CREATE TRIGGER tr_certificates_updated_at
  BEFORE UPDATE ON public.certificates
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 2. SEQUENTIAL CODE GENERATORS & PARAMETER TAMPERING MITIGATION
-- Auto-generates unique human-readable tracking codes.
-- If submitted by anonymous / untrusted callers, strips any forged internal fields.
-- Format: HCK-SRV-YYYY-XXXXX and HCK-EDU-YYYY-XXXXX
-- ------------------------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS public.seq_service_enquiry_code START 1;
CREATE SEQUENCE IF NOT EXISTS public.seq_training_registration_code START 1;

CREATE OR REPLACE FUNCTION public.generate_service_enquiry_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Always generate sequential tracking code for new records if missing or if caller is untrusted
  IF NEW.enquiry_code IS NULL OR TRIM(NEW.enquiry_code) = '' OR auth.role() = 'anon' THEN
    NEW.enquiry_code := 'HCK-SRV-' || 
                        TO_CHAR(timezone('utc', now()), 'YYYY') || '-' || 
                        LPAD(NEXTVAL('public.seq_service_enquiry_code')::TEXT, 5, '0');
  END IF;

  -- Anti-tampering: Anonymous public submissions cannot inject internal status, staff assignments, or internal notes
  IF auth.role() = 'anon' THEN
    NEW.status := 'NEW'::public.enquiry_status;
    NEW.assigned_to := NULL;
    NEW.internal_notes := NULL;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.generate_service_enquiry_code() FROM PUBLIC, anon;

DROP TRIGGER IF EXISTS tr_service_enquiry_code ON public.service_enquiries;
CREATE TRIGGER tr_service_enquiry_code
  BEFORE INSERT ON public.service_enquiries
  FOR EACH ROW EXECUTE FUNCTION public.generate_service_enquiry_code();

CREATE OR REPLACE FUNCTION public.generate_training_registration_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Always generate sequential registration code for new records if missing or if caller is untrusted
  IF NEW.registration_code IS NULL OR TRIM(NEW.registration_code) = '' OR auth.role() = 'anon' THEN
    NEW.registration_code := 'HCK-EDU-' || 
                             TO_CHAR(timezone('utc', now()), 'YYYY') || '-' || 
                             LPAD(NEXTVAL('public.seq_training_registration_code')::TEXT, 5, '0');
  END IF;

  -- Anti-tampering: Anonymous public submissions cannot inject internal status, staff assignments, or internal notes
  IF auth.role() = 'anon' THEN
    NEW.status := 'NEW'::public.enquiry_status;
    NEW.assigned_to := NULL;
    NEW.internal_notes := NULL;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.generate_training_registration_code() FROM PUBLIC, anon;

DROP TRIGGER IF EXISTS tr_training_registration_code ON public.training_registrations;
CREATE TRIGGER tr_training_registration_code
  BEFORE INSERT ON public.training_registrations
  FOR EACH ROW EXECUTE FUNCTION public.generate_training_registration_code();

-- ------------------------------------------------------------------------------
-- 3. ESSENTIAL PERFORMANCE & SECURITY INDEXES
-- ------------------------------------------------------------------------------

-- Functional index for Certificate Verification RPC (Matches query UPPER(TRIM(certificate_id)))
CREATE INDEX IF NOT EXISTS idx_certificates_upper_cert_id 
  ON public.certificates (UPPER(TRIM(certificate_id)));

-- Indexes on foreign keys
CREATE INDEX IF NOT EXISTS idx_service_enquiries_assigned_to 
  ON public.service_enquiries (assigned_to);

CREATE INDEX IF NOT EXISTS idx_training_batches_program_id 
  ON public.training_batches (program_id);

CREATE INDEX IF NOT EXISTS idx_training_registrations_assigned_to 
  ON public.training_registrations (assigned_to);

CREATE INDEX IF NOT EXISTS idx_certificates_created_by 
  ON public.certificates (created_by);

CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id 
  ON public.audit_logs (admin_id);

-- Indexes for dashboard filtering & ordering
CREATE INDEX IF NOT EXISTS idx_service_enquiries_status_created 
  ON public.service_enquiries (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_training_registrations_status_created 
  ON public.training_registrations (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_certificates_status_category 
  ON public.certificates (status, category);

CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_created 
  ON public.audit_logs (entity_type, created_at DESC);

-- ------------------------------------------------------------------------------
-- 4. GRANULAR RBAC SECURITY HELPER FUNCTIONS
-- Explicitly separates SUPER_ADMIN, ADMIN, AUDITOR, and INSTRUCTOR permissions.
-- Uses empty search_path and explicit qualification for maximum security.
-- ------------------------------------------------------------------------------

-- Get verified active role of authenticated caller
CREATE OR REPLACE FUNCTION public.get_current_admin_role()
RETURNS public.admin_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT role FROM public.admin_profiles
  WHERE id = auth.uid() AND is_active = TRUE
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_current_admin_role() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_current_admin_role() TO authenticated, service_role;

-- Super Admin: Full system control & staff management
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role = 'SUPER_ADMIN'::public.admin_role AND is_active = TRUE
  );
$$;

REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, service_role;

-- Admin or Super Admin: Operational write access
CREATE OR REPLACE FUNCTION public.is_admin_or_super()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role IN ('SUPER_ADMIN'::public.admin_role, 'ADMIN'::public.admin_role) AND is_active = TRUE
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin_or_super() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin_or_super() TO authenticated, service_role;

-- Can View Confidential Enquiries: Super Admin, Admin, and Auditor
-- NOTE: Instructors are EXCLUDED to prevent leakage of enterprise client NDA data
CREATE OR REPLACE FUNCTION public.can_view_enquiries()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role IN ('SUPER_ADMIN'::public.admin_role, 'ADMIN'::public.admin_role, 'AUDITOR'::public.admin_role) AND is_active = TRUE
  );
$$;

REVOKE ALL ON FUNCTION public.can_view_enquiries() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_view_enquiries() TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 5. REFINED, REPEATABLE ROW LEVEL SECURITY POLICIES
-- ------------------------------------------------------------------------------

-- Table: admin_profiles
-- Self-provisioning protection: Non-super-admins cannot insert or alter roles.
DROP POLICY IF EXISTS "Admins can view profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Staff can view active profiles" ON public.admin_profiles;
CREATE POLICY "Staff can view active profiles"
  ON public.admin_profiles FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

DROP POLICY IF EXISTS "Super Admins can manage profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Super Admins can insert profiles" ON public.admin_profiles;
CREATE POLICY "Super Admins can insert profiles"
  ON public.admin_profiles FOR INSERT
  TO authenticated
  WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "Super Admins can update profiles" ON public.admin_profiles;
CREATE POLICY "Super Admins can update profiles"
  ON public.admin_profiles FOR UPDATE
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "Super Admins can delete profiles" ON public.admin_profiles;
CREATE POLICY "Super Admins can delete profiles"
  ON public.admin_profiles FOR DELETE
  TO authenticated
  USING (public.is_super_admin());

-- Table: service_enquiries
-- Public can INSERT; Only Super Admin, Admin, and Auditor can SELECT; Only Admin/Super can UPDATE; Only Super Admin can DELETE.
DROP POLICY IF EXISTS "Public can submit service enquiries" ON public.service_enquiries;
CREATE POLICY "Public can submit service enquiries"
  ON public.service_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage service enquiries" ON public.service_enquiries;
DROP POLICY IF EXISTS "Authorized staff can view service enquiries" ON public.service_enquiries;
CREATE POLICY "Authorized staff can view service enquiries"
  ON public.service_enquiries FOR SELECT
  TO authenticated
  USING (public.can_view_enquiries());

DROP POLICY IF EXISTS "Admins can update service enquiries" ON public.service_enquiries;
CREATE POLICY "Admins can update service enquiries"
  ON public.service_enquiries FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_super())
  WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Super Admins can delete service enquiries" ON public.service_enquiries;
CREATE POLICY "Super Admins can delete service enquiries"
  ON public.service_enquiries FOR DELETE
  TO authenticated
  USING (public.is_super_admin());

-- Table: training_programs
-- Public can read published programs; Active staff can view all in dashboard; Only Admin/Super can manage.
DROP POLICY IF EXISTS "Public can read published training programs" ON public.training_programs;
CREATE POLICY "Public can read published training programs"
  ON public.training_programs FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Admins can manage training programs" ON public.training_programs;
DROP POLICY IF EXISTS "Staff can manage training programs" ON public.training_programs;
DROP POLICY IF EXISTS "Staff can view all training programs" ON public.training_programs;
CREATE POLICY "Staff can view all training programs"
  ON public.training_programs FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admins can insert training programs" ON public.training_programs;
CREATE POLICY "Admins can insert training programs"
  ON public.training_programs FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Admins can update training programs" ON public.training_programs;
CREATE POLICY "Admins can update training programs"
  ON public.training_programs FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_super())
  WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Super Admins can delete training programs" ON public.training_programs;
CREATE POLICY "Super Admins can delete training programs"
  ON public.training_programs FOR DELETE
  TO authenticated
  USING (public.is_super_admin());

-- Table: training_batches
DROP POLICY IF EXISTS "Public can view active batches" ON public.training_batches;
CREATE POLICY "Public can view active batches"
  ON public.training_batches FOR SELECT
  TO anon, authenticated
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admins can manage training batches" ON public.training_batches;
DROP POLICY IF EXISTS "Staff can manage training batches" ON public.training_batches;
DROP POLICY IF EXISTS "Staff can view all training batches" ON public.training_batches;
CREATE POLICY "Staff can view all training batches"
  ON public.training_batches FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admins can insert training batches" ON public.training_batches;
CREATE POLICY "Admins can insert training batches"
  ON public.training_batches FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Admins can update training batches" ON public.training_batches;
CREATE POLICY "Admins can update training batches"
  ON public.training_batches FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_super())
  WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Super Admins can delete training batches" ON public.training_batches;
CREATE POLICY "Super Admins can delete training batches"
  ON public.training_batches FOR DELETE
  TO authenticated
  USING (public.is_super_admin());

-- Table: training_registrations
DROP POLICY IF EXISTS "Public can submit training registrations" ON public.training_registrations;
CREATE POLICY "Public can submit training registrations"
  ON public.training_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage training registrations" ON public.training_registrations;
DROP POLICY IF EXISTS "Staff can view training registrations" ON public.training_registrations;
CREATE POLICY "Staff can view training registrations"
  ON public.training_registrations FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admins can update training registrations" ON public.training_registrations;
CREATE POLICY "Admins can update training registrations"
  ON public.training_registrations FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_super())
  WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Super Admins can delete training registrations" ON public.training_registrations;
CREATE POLICY "Super Admins can delete training registrations"
  ON public.training_registrations FOR DELETE
  TO authenticated
  USING (public.is_super_admin());

-- Table: certificates
-- Direct SELECT is prohibited for anon. Only active staff can inspect repository.
DROP POLICY IF EXISTS "Admins can manage certificates" ON public.certificates;
DROP POLICY IF EXISTS "Staff can view certificates repository" ON public.certificates;
CREATE POLICY "Staff can view certificates repository"
  ON public.certificates FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admins can issue certificates" ON public.certificates;
CREATE POLICY "Admins can issue certificates"
  ON public.certificates FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Admins can update or revoke certificates" ON public.certificates;
CREATE POLICY "Admins can update or revoke certificates"
  ON public.certificates FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_super())
  WITH CHECK (public.is_admin_or_super());

DROP POLICY IF EXISTS "Super Admins can delete certificates" ON public.certificates;
CREATE POLICY "Super Admins can delete certificates"
  ON public.certificates FOR DELETE
  TO authenticated
  USING (public.is_super_admin());

-- Table: audit_logs
-- Append-only audit trail with admin_id spoofing prevention.
DROP POLICY IF EXISTS "Admins can read audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Staff can read audit logs" ON public.audit_logs;
CREATE POLICY "Staff can read audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (public.can_view_enquiries());

DROP POLICY IF EXISTS "System can record audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Staff can append audit logs" ON public.audit_logs;
CREATE POLICY "Staff can append audit logs"
  ON public.audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_active_admin() AND 
    (admin_id IS NULL OR admin_id = auth.uid())
  );

-- Trigger to guarantee admin_id matches authenticated caller
CREATE OR REPLACE FUNCTION public.handle_audit_log_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF auth.uid() IS NOT NULL THEN
    NEW.admin_id := auth.uid();
  END IF;
  NEW.created_at := timezone('utc', now());
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_audit_log_insert() FROM PUBLIC, anon;

DROP TRIGGER IF EXISTS tr_audit_logs_before_insert ON public.audit_logs;
CREATE TRIGGER tr_audit_logs_before_insert
  BEFORE INSERT ON public.audit_logs
  FOR EACH ROW EXECUTE FUNCTION public.handle_audit_log_insert();

-- Application-level immutability enforcement trigger
-- NOTE: This protects against application-layer modifications and standard SQL users.
-- Database superusers (postgres role / Supabase service role) retain administrative
-- capabilities to disable triggers or truncate tables via direct database console.
CREATE OR REPLACE FUNCTION public.prevent_audit_log_tampering()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RAISE EXCEPTION 'Audit logs are strictly immutable and cannot be updated or deleted.';
END;
$$;

REVOKE ALL ON FUNCTION public.prevent_audit_log_tampering() FROM PUBLIC, anon;

DROP TRIGGER IF EXISTS tr_audit_logs_immutable ON public.audit_logs;
CREATE TRIGGER tr_audit_logs_immutable
  BEFORE UPDATE OR DELETE ON public.audit_logs
  FOR EACH ROW EXECUTE FUNCTION public.prevent_audit_log_tampering();

-- ------------------------------------------------------------------------------
-- 6. DEFENSE-IN-DEPTH: TABLE-LEVEL PRIVILEGE REVOCATIONS
-- Revoke all table-level access from anon on strictly internal tables.
-- Even if an RLS policy were misconfigured in the future, PostgreSQL permission
-- checks will block anonymous access at the relation layer.
-- ------------------------------------------------------------------------------
REVOKE ALL ON TABLE public.admin_profiles FROM anon;
REVOKE ALL ON TABLE public.certificates FROM anon;
REVOKE ALL ON TABLE public.audit_logs FROM anon;

-- ------------------------------------------------------------------------------
-- 7. FIRST SUPER-ADMIN BOOTSTRAP UTILITY
-- Allows initial setup of the first Super Admin without exposing public registration.
-- Concurrency-safe, requires verified auth.users match, and callable ONLY by service_role.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.bootstrap_initial_super_admin(
  p_user_id UUID,
  p_email TEXT,
  p_full_name TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_existing_super_admin_count INT;
  v_auth_email TEXT;
BEGIN
  -- 1. Concurrency control: Acquire transactional advisory lock to prevent race conditions
  PERFORM pg_advisory_xact_lock(hashtext('bootstrap_initial_super_admin'));

  -- 2. Security check: Fail if ANY super admin profile already exists (active or inactive)
  SELECT COUNT(*) INTO v_existing_super_admin_count 
  FROM public.admin_profiles 
  WHERE role = 'SUPER_ADMIN'::public.admin_role;

  IF v_existing_super_admin_count > 0 THEN
    RAISE EXCEPTION 'Bootstrap denied: A Super Admin account already exists. New staff must be provisioned by an existing Super Admin.';
  END IF;

  -- 3. Verify that the target user ID exists in auth.users and matches p_email
  SELECT email INTO v_auth_email 
  FROM auth.users 
  WHERE id = p_user_id;

  IF v_auth_email IS NULL THEN
    RAISE EXCEPTION 'Bootstrap denied: User ID % does not exist in auth.users.', p_user_id;
  END IF;

  IF LOWER(TRIM(v_auth_email)) <> LOWER(TRIM(p_email)) THEN
    RAISE EXCEPTION 'Bootstrap denied: Provided email (%) does not match auth.users record (%).', p_email, v_auth_email;
  END IF;

  -- 4. Insert initial super admin profile linked to the verified auth.users ID
  INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
  VALUES (p_user_id, LOWER(TRIM(p_email)), TRIM(p_full_name), 'SUPER_ADMIN'::public.admin_role, TRUE)
  ON CONFLICT (id) DO UPDATE 
  SET role = 'SUPER_ADMIN'::public.admin_role, 
      is_active = TRUE,
      updated_at = timezone('utc', now());

  RETURN TRUE;
END;
$$;

-- Strict revocation: Only postgres (superuser) and service_role can execute bootstrap
REVOKE ALL ON FUNCTION public.bootstrap_initial_super_admin(UUID, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.bootstrap_initial_super_admin(UUID, TEXT, TEXT) TO service_role;
