import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hasRequiredRole, authenticateStaffRequest } from '../api/_lib/auth';
import { sanitizeAuditDetails } from '../api/_lib/audit';
import * as supabaseServer from '../api/_lib/supabaseServer';

describe('RBAC Role Authorization (`hasRequiredRole`)', () => {
  it('correctly checks SUPER_ADMIN permissions', () => {
    expect(hasRequiredRole('SUPER_ADMIN', ['SUPER_ADMIN'])).toBe(true);
    expect(hasRequiredRole('SUPER_ADMIN', ['SUPER_ADMIN', 'ADMIN'])).toBe(true);
    expect(hasRequiredRole('SUPER_ADMIN', ['INSTRUCTOR'])).toBe(false);
  });

  it('correctly checks ADMIN permissions', () => {
    expect(hasRequiredRole('ADMIN', ['SUPER_ADMIN'])).toBe(false);
    expect(hasRequiredRole('ADMIN', ['SUPER_ADMIN', 'ADMIN'])).toBe(true);
  });

  it('correctly restricts INSTRUCTOR from accessing B2B service enquiries and audit logs', () => {
    const ENQUIRY_ROLES = ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'] as const;
    const AUDIT_ROLES = ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'] as const;

    expect(hasRequiredRole('INSTRUCTOR', [...ENQUIRY_ROLES])).toBe(false);
    expect(hasRequiredRole('INSTRUCTOR', [...AUDIT_ROLES])).toBe(false);
  });

  it('correctly allows INSTRUCTOR to manage training batches and programs', () => {
    const TRAINING_ROLES = ['SUPER_ADMIN', 'ADMIN', 'INSTRUCTOR'] as const;
    expect(hasRequiredRole('INSTRUCTOR', [...TRAINING_ROLES])).toBe(true);
  });

  it('correctly restricts AUDITOR to read-only access and denies write operations', () => {
    const WRITE_ROLES = ['SUPER_ADMIN', 'ADMIN'] as const;
    expect(hasRequiredRole('AUDITOR', [...WRITE_ROLES])).toBe(false);
  });
});

describe('Export Authorization Matrix across Roles', () => {
  const ROLES = ['SUPER_ADMIN', 'ADMIN', 'AUDITOR', 'INSTRUCTOR'] as const;

  it('service_enquiries export is permitted to SUPER_ADMIN, ADMIN, AUDITOR, and denied to INSTRUCTOR', () => {
    const PERMITTED = ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'];
    expect(hasRequiredRole('SUPER_ADMIN', PERMITTED as any)).toBe(true);
    expect(hasRequiredRole('ADMIN', PERMITTED as any)).toBe(true);
    expect(hasRequiredRole('AUDITOR', PERMITTED as any)).toBe(true);
    expect(hasRequiredRole('INSTRUCTOR', PERMITTED as any)).toBe(false);
  });

  it('training_registrations export is permitted to SUPER_ADMIN, ADMIN, AUDITOR, and denied to INSTRUCTOR', () => {
    const PERMITTED = ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'];
    expect(hasRequiredRole('SUPER_ADMIN', PERMITTED as any)).toBe(true);
    expect(hasRequiredRole('ADMIN', PERMITTED as any)).toBe(true);
    expect(hasRequiredRole('AUDITOR', PERMITTED as any)).toBe(true);
    expect(hasRequiredRole('INSTRUCTOR', PERMITTED as any)).toBe(false);
  });

  it('certificates export is strictly restricted to SUPER_ADMIN and ADMIN, denying AUDITOR and INSTRUCTOR', () => {
    const PERMITTED = ['SUPER_ADMIN', 'ADMIN'];
    expect(hasRequiredRole('SUPER_ADMIN', PERMITTED as any)).toBe(true);
    expect(hasRequiredRole('ADMIN', PERMITTED as any)).toBe(true);
    expect(hasRequiredRole('AUDITOR', PERMITTED as any)).toBe(false);
    expect(hasRequiredRole('INSTRUCTOR', PERMITTED as any)).toBe(false);
  });
});

describe('Staff Authentication (`authenticateStaffRequest`)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects missing Authorization header with 401', async () => {
    const result = await authenticateStaffRequest(undefined);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.status).toBe(401);
      expect(result.error).toContain('Missing or malformed Authorization header');
    }
  });

  it('rejects malformed header without Bearer prefix with 401', async () => {
    const result = await authenticateStaffRequest('Basic dXNlcjpwYXNz');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.status).toBe(401);
    }
  });

  it('rejects empty Bearer token with 401', async () => {
    const result = await authenticateStaffRequest('Bearer    ');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.status).toBe(401);
    }
  });

  it('rejects invalid or expired JWT token with 401', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: new Error('Token expired') }),
      },
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const result = await authenticateStaffRequest('Bearer invalid-token-123');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.status).toBe(401);
      expect(result.error).toContain('expired');
    }
  });

  it('rejects valid Auth user with NO admin profile record with 403', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-without-profile', email: 'test@example.com' } }, error: null }),
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Row not found' } }),
      }),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const result = await authenticateStaffRequest('Bearer valid-jwt-token');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.status).toBe(403);
      expect(result.error).toContain('No administrative staff profile found');
    }
  });

  it('rejects inactive or suspended staff profile (`is_active = false`) with 403', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'inactive-staff-id', email: 'suspended@hackup.com' } }, error: null }),
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: {
            id: 'inactive-staff-id',
            email: 'suspended@hackup.com',
            full_name: 'Suspended Admin',
            role: 'ADMIN',
            is_active: false,
          },
          error: null,
        }),
      }),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const result = await authenticateStaffRequest('Bearer suspended-jwt-token');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.status).toBe(403);
      expect(result.error).toContain('inactive or suspended');
    }
  });

  it('successfully authenticates active admin staff with 200 and profile context', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'admin-123', email: 'dinesh@hackup.com' } }, error: null }),
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: {
            id: 'admin-123',
            email: 'dinesh@hackup.com',
            full_name: 'Dinesh Paranthagan',
            role: 'SUPER_ADMIN',
            is_active: true,
          },
          error: null,
        }),
      }),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const result = await authenticateStaffRequest('Bearer valid-admin-jwt');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.auth.userId).toBe('admin-123');
      expect(result.auth.profile.role).toBe('SUPER_ADMIN');
      expect(result.auth.profile.is_active).toBe(true);
    }
  });
});

describe('Audit Log Metadata Sanitization (`sanitizeAuditDetails`)', () => {
  it('strips passwords, tokens, API keys, and authorization headers from audit details', () => {
    const rawDetails = {
      targetId: 'uuid-1234',
      actionType: 'UPDATE_STATUS',
      password: 'SuperSecretPassword!',
      token: 'jwt.token.here',
      secret: 'mock_secret_key',
      apiKey: 're_123456789',
      authorization: 'Bearer privileged_token',
      nested: {
        safeField: 'audit value',
        cookie: 'session_cookie_val',
        refreshToken: 'refresh_secret',
      },
    };

    const sanitized = sanitizeAuditDetails(rawDetails);

    expect(sanitized.targetId).toBe('uuid-1234');
    expect(sanitized.actionType).toBe('UPDATE_STATUS');
    expect(sanitized.password).toBeUndefined();
    expect(sanitized.token).toBeUndefined();
    expect(sanitized.secret).toBeUndefined();
    expect(sanitized.apiKey).toBeUndefined();
    expect(sanitized.authorization).toBeUndefined();

    // Check nested sanitization
    expect(sanitized.nested.safeField).toBe('audit value');
    expect(sanitized.nested.cookie).toBeUndefined();
    expect(sanitized.nested.refreshToken).toBeUndefined();
  });
});
