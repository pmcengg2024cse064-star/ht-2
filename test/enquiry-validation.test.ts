import { describe, it, expect, vi, beforeEach } from 'vitest';
import serviceEnquiryHandler from '../api/enquiries/service';
import trainingRegistrationHandler from '../api/registrations/training';
import verifyCertificateHandler from '../api/certificates/verify';
import adminEnquiriesHandler from '../api/_admin/enquiries';
import adminExportHandler from '../api/_admin/export';
import adminSlugHandler from '../api/admin/[...slug]';
import { checkMethod, parseBody, getClientIp } from '../api/_lib/response';
import * as turnstileModule from '../api/_lib/turnstile';
import * as rateLimiterModule from '../api/_lib/rateLimiter';
import * as supabaseServer from '../api/_lib/supabaseServer';
import * as authModule from '../api/_lib/auth';
import { EventEmitter } from 'node:events';

// Helper to create mock HTTP Request
function createMockRequest(options: {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
  body?: any;
}) {
  const req = new EventEmitter() as any;
  req.method = options.method || 'POST';
  req.url = options.url || '/api/test';
  req.headers = options.headers || { 'content-type': 'application/json' };
  req.socket = { remoteAddress: '127.0.0.1' };
  req.body = options.body;
  return req;
}

// Helper to create mock HTTP Response
function createMockResponse() {
  const res: any = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: '',
    setHeader: vi.fn((key: string, val: string) => {
      res.headers[key.toLowerCase()] = val;
    }),
    end: vi.fn((chunk?: any) => {
      if (chunk) res.body = chunk;
    }),
  };
  return res;
}

describe('HTTP Method & Payload Size Controls', () => {
  it('rejects disallowed methods with 405 Method Not Allowed', () => {
    const req = createMockRequest({ method: 'GET' });
    const res = createMockResponse();

    const allowed = checkMethod(req, res, ['POST']);
    expect(allowed).toBe(false);
    expect(res.statusCode).toBe(405);
    const body = JSON.parse(res.body);
    expect(body.error).toContain('Method GET Not Allowed');
  });

  it('rejects malformed JSON with 400 Bad Request in parseBody', async () => {
    const req = new EventEmitter() as any;
    req.headers = {};
    req.socket = {};

    const promise = parseBody(req);
    req.emit('data', Buffer.from('{ malformed: true '));
    req.emit('end');

    await expect(promise).rejects.toThrow('Malformed JSON');
  });

  it('rejects oversized payloads (> 1MB) with 413 Payload Too Large', async () => {
    const req = new EventEmitter() as any;
    req.headers = {};
    req.socket = {};
    req.destroy = vi.fn();

    const promise = parseBody(req, 100); // 100 byte limit for test
    const largeChunk = Buffer.alloc(200, 'a');
    req.emit('data', largeChunk);

    await expect(promise).rejects.toThrow('Payload Too Large');
  });
});

describe('Trusted Client IP Extraction (`getClientIp`)', () => {
  it('prioritizes trusted x-vercel-ip header over x-forwarded-for', () => {
    const req = createMockRequest({
      headers: {
        'x-vercel-ip': '203.0.113.50',
        'x-forwarded-for': '1.1.1.1, 2.2.2.2',
      },
    });
    expect(getClientIp(req)).toBe('203.0.113.50');
  });

  it('uses rightmost edge IP from multi-value x-forwarded-for to prevent spoofing', () => {
    const req = createMockRequest({
      headers: {
        // Attacker prepended spoofed 1.1.1.1, Vercel appended true remote 198.51.100.22
        'x-forwarded-for': '1.1.1.1, 10.0.0.1, 198.51.100.22',
      },
    });
    expect(getClientIp(req)).toBe('198.51.100.22');
  });

  it('strips port from IPv4 address', () => {
    const req = createMockRequest({
      headers: {
        'x-real-ip': '203.0.113.99:54321',
      },
    });
    expect(getClientIp(req)).toBe('203.0.113.99');
  });

  it('falls back to 127.0.0.1 on invalid or injected characters in headers', () => {
    const req = createMockRequest({
      headers: {
        'x-vercel-ip': 'invalid;injection<script>',
      },
    });
    req.socket.remoteAddress = undefined;
    expect(getClientIp(req)).toBe('127.0.0.1');
  });
});

describe('Admin Serverless Catch-All Router (`/api/admin/[...slug]`)', () => {
  it('returns clean JSON 404 for nonexistent admin routes', async () => {
    const req = createMockRequest({ method: 'GET', url: '/api/admin/nonexistent-route' });
    const res = createMockResponse();

    await adminSlugHandler(req, res);

    expect(res.statusCode).toBe(404);
    const data = JSON.parse(res.body);
    expect(data.code).toBe('NOT_FOUND');
    expect(data.error).toContain('not found');
  });
});

describe('Service Enquiry API (`/api/enquiries/service`)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(turnstileModule, 'verifyTurnstileToken').mockResolvedValue({ success: true });
    vi.spyOn(rateLimiterModule, 'checkRateLimit').mockResolvedValue({ success: true, remaining: 5, resetAt: Date.now() + 60 });
  });

  it('returns 503 Service Unavailable when rate limiter fails closed', async () => {
    vi.spyOn(rateLimiterModule, 'checkRateLimit').mockResolvedValue({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 60,
      isServiceUnavailable: true, // Distributed limiter down
    });

    const req = createMockRequest({
      method: 'POST',
      body: {
        contactName: 'Test Officer',
        workEmail: 'officer@bank.com',
        phoneNumber: '+91 95977 75522',
      },
    });
    const res = createMockResponse();

    await serviceEnquiryHandler(req, res);

    expect(res.statusCode).toBe(503);
    const data = JSON.parse(res.body);
    expect(data.code).toBe('SERVICE_UNAVAILABLE');
    expect(data.error).toContain('temporarily unavailable');
  });

  it('rejects missing contact name with 400', async () => {
    const req = createMockRequest({
      method: 'POST',
      body: {
        workEmail: 'attacker@example.com',
        // contactName missing
      },
    });
    const res = createMockResponse();

    await serviceEnquiryHandler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('Please provide a valid full name');
  });

  it('rejects malformed email format with 400', async () => {
    const req = createMockRequest({
      method: 'POST',
      body: {
        contactName: 'Test User',
        workEmail: 'invalid-email-no-at-sign',
        phoneNumber: '+919876543210',
      },
    });
    const res = createMockResponse();

    await serviceEnquiryHandler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('valid corporate email address');
  });

  it('rejects invalid or too short phone numbers with 400', async () => {
    const req = createMockRequest({
      method: 'POST',
      body: {
        contactName: 'Test User',
        workEmail: 'valid@corporate.com',
        phoneNumber: '123', // Too short
      },
    });
    const res = createMockResponse();

    await serviceEnquiryHandler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('valid phone number');
  });

  it('prevents clients from setting privileged fields (status, internal_notes, assigned_to)', async () => {
    let insertedPayload: any = null;
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        insert: vi.fn().mockImplementation((payload) => {
          insertedPayload = payload;
          return {
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: { enquiry_code: 'SRV-20261029-A1B2', created_at: new Date().toISOString() },
              error: null,
            }),
          };
        }),
      }),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const req = createMockRequest({
      method: 'POST',
      body: {
        contactName: 'Security Officer',
        workEmail: 'auditor@corporate.com',
        phoneNumber: '+91 95977 75522',
        companyName: 'Corporate Bank',
        serviceInterest: 'Penetration Testing (VAPT)',
        // Privileged fields client attempts to inject:
        status: 'RESOLVED',
        internal_notes: 'Hacked by attacker',
        assigned_to: '00000000-0000-0000-0000-000000000000',
        tracking_code: 'CUSTOM-OVERRIDE',
      },
    });
    const res = createMockResponse();

    await serviceEnquiryHandler(req, res);

    expect(res.statusCode).toBe(201);
    expect(insertedPayload).toBeDefined();
    // Verify server forced default values and disregarded client injection
    expect(insertedPayload.status).toBe('NEW');
    expect(insertedPayload.internal_notes).toBeNull();
    expect(insertedPayload.assigned_to).toBeNull();
    expect((insertedPayload as any).tracking_code).toBeUndefined();

    const data = JSON.parse(res.body);
    expect(data.success).toBe(true);
    expect(data.trackingCode).toBe('SRV-20261029-A1B2');
  });
});

describe('Training Demo Registration API (`/api/registrations/training`)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(turnstileModule, 'verifyTurnstileToken').mockResolvedValue({ success: true });
    vi.spyOn(rateLimiterModule, 'checkRateLimit').mockResolvedValue({ success: true, remaining: 5, resetAt: Date.now() + 60 });
  });

  it('rejects registration if candidate name is missing with 400', async () => {
    const req = createMockRequest({
      method: 'POST',
      body: {
        whatsappNumber: '+91 98765 43210',
      },
    });
    const res = createMockResponse();

    await trainingRegistrationHandler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('Please provide a valid full name');
  });

  it('rejects registration if specified batch is CLOSED or inactive', async () => {
    const mockSupabase = {
      from: vi.fn().mockImplementation((table: string) => {
        if (table === 'training_batches') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'batch-closed-id',
                status: 'CLOSED', // Batch is closed
                is_active: true,
              },
              error: null,
            }),
          };
        }
        return {
          insert: vi.fn().mockReturnThis(),
          select: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: {}, error: null }),
        };
      }),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const req = createMockRequest({
      method: 'POST',
      body: {
        batchId: 'batch-closed-id',
        candidateName: 'Student Candidate',
        whatsappNumber: '+91 98765 43210',
        programTitle: 'Master Cyber Security Track',
      },
    });
    const res = createMockResponse();

    await trainingRegistrationHandler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('closed');
  });
});

describe('Administrative Staff Assignment Validation (`/api/admin/enquiries`)', () => {
  const mockAdminProfile = {
    id: 'a0000000-0000-0000-0000-000000000001',
    email: 'admin@hackup.com',
    full_name: 'Super Admin',
    role: 'SUPER_ADMIN' as const,
    is_active: true,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(authModule, 'authenticateStaffRequest').mockResolvedValue({
      success: true,
      auth: {
        userId: mockAdminProfile.id,
        email: mockAdminProfile.email,
        profile: mockAdminProfile,
      },
    });
  });

  it('rejects assignment when target staff profile is inactive (STAFF_INACTIVE)', async () => {
    const inactiveStaffId = 'b0000000-0000-0000-0000-000000000002';
    const mockSupabase = {
      from: vi.fn().mockImplementation((table: string) => {
        if (table === 'admin_profiles') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: { id: inactiveStaffId, is_active: false }, // Inactive staff
              error: null,
            }),
          };
        }
        return {
          update: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          select: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: {}, error: null }),
        };
      }),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const req = createMockRequest({
      method: 'PATCH',
      headers: { authorization: 'Bearer token', 'content-type': 'application/json' },
      body: {
        id: 'enquiry-uuid-1',
        assignedTo: inactiveStaffId,
      },
    });
    const res = createMockResponse();

    await adminEnquiriesHandler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res.body);
    expect(data.code).toBe('STAFF_INACTIVE');
    expect(data.error).toContain('inactive or suspended');
  });

  it('rejects assignment when target staff profile does not exist (STAFF_NOT_FOUND)', async () => {
    const nonExistentId = 'c0000000-0000-0000-0000-000000000003';
    const mockSupabase = {
      from: vi.fn().mockImplementation((table: string) => {
        if (table === 'admin_profiles') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Row not found' },
            }),
          };
        }
        return {};
      }),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const req = createMockRequest({
      method: 'PATCH',
      headers: { authorization: 'Bearer token', 'content-type': 'application/json' },
      body: {
        id: 'enquiry-uuid-1',
        assignedTo: nonExistentId,
      },
    });
    const res = createMockResponse();

    await adminEnquiriesHandler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res.body);
    expect(data.code).toBe('STAFF_NOT_FOUND');
  });

  it('allows unassignment by passing null or empty string', async () => {
    let updatedPayload: any = null;
    const mockSupabase = {
      from: vi.fn().mockImplementation((table: string) => {
        if (table === 'service_enquiries') {
          return {
            update: vi.fn().mockImplementation((p) => {
              updatedPayload = p;
              return {
                eq: vi.fn().mockReturnThis(),
                select: vi.fn().mockReturnThis(),
                single: vi.fn().mockResolvedValue({ data: { id: 'enq-1' }, error: null }),
              };
            }),
          };
        }
        if (table === 'audit_logs') {
          return {
            insert: vi.fn().mockResolvedValue({ error: null }),
          };
        }
        return {};
      }),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const req = createMockRequest({
      method: 'PATCH',
      headers: { authorization: 'Bearer token', 'content-type': 'application/json' },
      body: {
        id: 'enquiry-uuid-1',
        assignedTo: null, // Explicit unassignment
      },
    });
    const res = createMockResponse();

    await adminEnquiriesHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(updatedPayload.assigned_to).toBeNull();
  });
});

describe('Export API Role Enforcement (`/api/admin/export`)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
    } as any);
  });

  it('rejects INSTRUCTOR from exporting certificates with 403', async () => {
    vi.spyOn(authModule, 'authenticateStaffRequest').mockResolvedValue({
      success: true,
      auth: {
        userId: 'instructor-1',
        email: 'inst@hackup.com',
        profile: {
          id: 'instructor-1',
          email: 'inst@hackup.com',
          full_name: 'Lead Trainer',
          role: 'INSTRUCTOR' as const,
          is_active: true,
        },
      },
    });

    const req = createMockRequest({
      method: 'GET',
      url: '/api/admin/export?type=certificates',
      headers: { authorization: 'Bearer token' },
    });
    const res = createMockResponse();

    await adminExportHandler(req, res);

    expect(res.statusCode).toBe(403);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('Access denied');
  });

  it('rejects AUDITOR from exporting certificates with 403', async () => {
    vi.spyOn(authModule, 'authenticateStaffRequest').mockResolvedValue({
      success: true,
      auth: {
        userId: 'auditor-1',
        email: 'audit@hackup.com',
        profile: {
          id: 'auditor-1',
          email: 'audit@hackup.com',
          full_name: 'Compliance Auditor',
          role: 'AUDITOR' as const,
          is_active: true,
        },
      },
    });

    const req = createMockRequest({
      method: 'GET',
      url: '/api/admin/export?type=certificates',
      headers: { authorization: 'Bearer token' },
    });
    const res = createMockResponse();

    await adminExportHandler(req, res);

    expect(res.statusCode).toBe(403);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('Access denied');
  });

  it('rejects INSTRUCTOR from exporting service enquiries with 403', async () => {
    vi.spyOn(authModule, 'authenticateStaffRequest').mockResolvedValue({
      success: true,
      auth: {
        userId: 'instructor-1',
        email: 'inst@hackup.com',
        profile: {
          id: 'instructor-1',
          email: 'inst@hackup.com',
          full_name: 'Lead Trainer',
          role: 'INSTRUCTOR' as const,
          is_active: true,
        },
      },
    });

    const req = createMockRequest({
      method: 'GET',
      url: '/api/admin/export?type=service_enquiries',
      headers: { authorization: 'Bearer token' },
    });
    const res = createMockResponse();

    await adminExportHandler(req, res);

    expect(res.statusCode).toBe(403);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('Access denied');
  });
});

describe('Public Certificate Verification API (`/api/certificates/verify`)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(rateLimiterModule, 'checkRateLimit').mockResolvedValue({ success: true, remaining: 10, resetAt: Date.now() + 60 });
  });

  it('rejects invalid or missing certificate IDs with 400', async () => {
    const req = createMockRequest({ method: 'GET', url: '/api/certificates/verify' });
    const res = createMockResponse();

    await verifyCertificateHandler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res.body);
    expect(data.error).toContain('Please provide a valid certificate identifier');
  });

  it('returns strictly the 9 approved public fields and hides sensitive internal fields', async () => {
    const mockCertRecord = {
      certificate_id: 'HACKUP-VAPT-2026-001',
      recipient_name: 'Adithya Sundaram',
      category: 'STUDENT_TRAINING',
      course_or_scope_title: 'Full-Stack Web & Mobile VAPT Masterclass',
      institution_or_company: 'PSG College of Technology',
      issue_date: '2026-06-15',
      expiry_date: null,
      status: 'ACTIVE',
      verification_hash: 'abc123sha256hash',
    };

    const mockSupabase = {
      rpc: vi.fn().mockResolvedValue({
        data: [mockCertRecord],
        error: null,
      }),
      from: vi.fn(),
    };
    vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

    const req = createMockRequest({
      method: 'GET',
      url: '/api/certificates/verify?id=HACKUP-VAPT-2026-001',
    });
    const res = createMockResponse();

    await verifyCertificateHandler(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.body);
    expect(data.success).toBe(true);
    expect(data.certificate).toBeDefined();

    // Verify 9 public fields present in camelCase
    expect(data.certificate.certificateId).toBe('HACKUP-VAPT-2026-001');
    expect(data.certificate.recipientName).toBe('Adithya Sundaram');
    expect(data.certificate.category).toBe('STUDENT_TRAINING');
    expect(data.certificate.courseOrScopeTitle).toBe('Full-Stack Web & Mobile VAPT Masterclass');
    expect(data.certificate.institutionOrCompany).toBe('PSG College of Technology');
    expect(data.certificate.issueDate).toBe('2026-06-15');
    expect(data.certificate.expiryDate).toBeNull();
    expect(data.certificate.status).toBe('ACTIVE');
    expect(data.certificate.verificationHash).toBe('abc123sha256hash');

    // Verify sensitive internal fields are completely absent
    expect(data.certificate.internal_notes).toBeUndefined();
    expect(data.certificate.created_by).toBeUndefined();
    expect(data.certificate.metadata).toBeUndefined();
  });
});
