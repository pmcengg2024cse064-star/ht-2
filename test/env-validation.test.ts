import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getServerEnv, validateRequiredEnv } from '../api/_lib/env';

describe('Server Environment Configuration & Validation', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    // Clear relevant environment variables
    delete process.env.SUPABASE_URL;
    delete process.env.VITE_SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.VITE_SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_SERVICE_KEY;
    delete process.env.SUPABASE_SECRET;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('fails validation when SUPABASE_URL is missing', () => {
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'valid-service-role-key-12345';
    const validation = validateRequiredEnv();
    expect(validation.isValid).toBe(false);
    expect(validation.missing).toContain('SUPABASE_URL');
  });

  it('fails validation when SUPABASE_URL is not a valid HTTP/HTTPS URL', () => {
    process.env.SUPABASE_URL = 'not-a-valid-url';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'valid-service-role-key-12345';
    const validation = validateRequiredEnv();
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some((e) => e.includes('valid http:// or https:// URL'))).toBe(true);
  });

  it('fails validation when SUPABASE_SERVICE_ROLE_KEY is missing', () => {
    process.env.SUPABASE_URL = 'https://valid-project.supabase.co';
    const validation = validateRequiredEnv();
    expect(validation.isValid).toBe(false);
    expect(validation.missing).toContain('SUPABASE_SERVICE_ROLE_KEY');
  });

  it('strictly ignores legacy aliases (SUPABASE_SERVICE_KEY, SUPABASE_SECRET) for service role', () => {
    process.env.SUPABASE_URL = 'https://valid-project.supabase.co';
    process.env.SUPABASE_SERVICE_KEY = 'legacy-key-attempt';
    process.env.SUPABASE_SECRET = 'legacy-secret-attempt';

    const env = getServerEnv();
    expect(env.SUPABASE_SERVICE_ROLE_KEY).toBe('');

    const validation = validateRequiredEnv();
    expect(validation.isValid).toBe(false);
    expect(validation.missing).toContain('SUPABASE_SERVICE_ROLE_KEY');
  });

  it('rejects SUPABASE_SERVICE_ROLE_KEY if it is identical to SUPABASE_ANON_KEY', () => {
    const leakedKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.anon-key';
    process.env.SUPABASE_URL = 'https://valid-project.supabase.co';
    process.env.SUPABASE_ANON_KEY = leakedKey;
    process.env.SUPABASE_SERVICE_ROLE_KEY = leakedKey;

    const validation = validateRequiredEnv();
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some((e) => e.includes('cannot be identical to SUPABASE_ANON_KEY'))).toBe(true);
  });

  it('fails validation when SUPABASE_URL and VITE_SUPABASE_URL point to different projects', () => {
    process.env.SUPABASE_URL = 'https://project-a.supabase.co';
    process.env.VITE_SUPABASE_URL = 'https://project-b.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'valid-service-role-key-12345';

    const validation = validateRequiredEnv();
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some((e) => e.includes('point to different hosts'))).toBe(true);
  });

  it('succeeds validation when SUPABASE_URL and VITE_SUPABASE_URL point to the same project', () => {
    process.env.SUPABASE_URL = 'https://same-project.supabase.co/';
    process.env.VITE_SUPABASE_URL = 'https://same-project.supabase.co';
    process.env.SUPABASE_ANON_KEY = 'eyJ-anon-key-different-from-service';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJ-service-role-secret-key-different';

    const validation = validateRequiredEnv();
    expect(validation.isValid).toBe(true);
    expect(validation.missing.length).toBe(0);
    expect(validation.errors.length).toBe(0);

    const env = getServerEnv();
    expect(env.SUPABASE_URL).toBe('https://same-project.supabase.co');
  });
});
