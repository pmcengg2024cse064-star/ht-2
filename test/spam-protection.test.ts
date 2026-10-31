import { describe, it, expect, vi, beforeEach } from 'vitest';
import serviceEnquiryHandler from '../api/enquiries/service';
import trainingRegistrationHandler from '../api/registrations/training';
import * as rateLimiterModule from '../api/_lib/rateLimiter';
import * as supabaseServer from '../api/_lib/supabaseServer';
import { EventEmitter } from 'node:events';

function createMockRequest(body: any, remoteIp = '127.0.0.1') {
  const req = new EventEmitter() as any;
  req.method = 'POST';
  req.url = '/api/test';
  req.headers = { 'content-type': 'application/json' };
  req.socket = { remoteAddress: remoteIp };
  req.body = body;
  return req;
}

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

describe('Non-CAPTCHA Multi-Layer Spam Protection', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(rateLimiterModule, 'checkRateLimit').mockResolvedValue({
      success: true,
      remaining: 9,
      resetAt: Date.now() + 60,
    });
  });

  describe('Service Enquiry Honeypot & Timing', () => {
    it('rejects bot submission when honeypot field (website_url) is populated', async () => {
      const req = createMockRequest({
        contactName: 'Spam Bot',
        workEmail: 'spambot@promotions.xyz',
        phoneNumber: '+91 99999 88888',
        serviceInterest: 'Penetration Testing',
        website_url: 'http://spam-link.ru/viagra', // Bot auto-filled honeypot
      });
      const res = createMockResponse();

      await serviceEnquiryHandler(req, res);

      expect(res.statusCode).toBe(400);
      const data = JSON.parse(res.body);
      expect(data.code).toBe('SPAM_DETECTED');
      expect(data.error).toContain('Invalid request submission');
    });

    it('rejects submission executed in sub-400ms superhuman speed', async () => {
      const req = createMockRequest({
        contactName: 'Fast Script',
        workEmail: 'script@speed.com',
        phoneNumber: '+91 99999 88888',
        serviceInterest: 'Penetration Testing',
        _form_rendered_at: Date.now() - 50, // 50ms elapsed
      });
      const res = createMockResponse();

      await serviceEnquiryHandler(req, res);

      expect(res.statusCode).toBe(400);
      const data = JSON.parse(res.body);
      expect(data.code).toBe('SPAM_DETECTED');
      expect(data.error).toContain('speed');
    });

    it('accepts legitimate human submission without any Turnstile token', async () => {
      const mockSupabase = {
        from: vi.fn().mockReturnValue({
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { enquiry_code: 'ENQ-2026-TEST', created_at: new Date().toISOString() },
                error: null,
              }),
            }),
          }),
        }),
      };
      vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

      const req = createMockRequest({
        contactName: 'A. Ramanathan',
        workEmail: 'ramanathan@tcs.com',
        phoneNumber: '+91 98765 43210',
        serviceInterest: 'Penetration Testing & VAPT',
        website_url: '', // Honeypot left blank by human
        _form_rendered_at: Date.now() - 5000, // 5 seconds elapsed
      });
      const res = createMockResponse();

      await serviceEnquiryHandler(req, res);

      expect(res.statusCode).toBe(201);
      const data = JSON.parse(res.body);
      expect(data.success).toBe(true);
      expect(data.trackingCode).toBe('ENQ-2026-TEST');
    });
  });

  describe('Training Registration Honeypot & Timing', () => {
    it('rejects bot training registration when honeypot field is populated', async () => {
      const req = createMockRequest({
        candidateName: 'Bot Candidate',
        email: 'bot@spam.com',
        whatsappNumber: '+91 98765 43210',
        programTitle: 'Certified Ethical Hacker',
        website_url: 'http://buy-followers.com',
      });
      const res = createMockResponse();

      await trainingRegistrationHandler(req, res);

      expect(res.statusCode).toBe(400);
      const data = JSON.parse(res.body);
      expect(data.code).toBe('SPAM_DETECTED');
    });

    it('accepts legitimate student registration without any Turnstile token', async () => {
      const mockSupabase = {
        from: vi.fn().mockReturnValue({
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { registration_code: 'REG-2026-TEST', created_at: new Date().toISOString() },
                error: null,
              }),
            }),
          }),
        }),
      };
      vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

      const req = createMockRequest({
        candidateName: 'S. Karthik',
        email: 'karthik@psgtech.edu',
        whatsappNumber: '+91 98765 43210',
        programTitle: 'Certified Ethical Hacker',
        website_url: '',
        _form_rendered_at: Date.now() - 3000,
      });
      const res = createMockResponse();

      await trainingRegistrationHandler(req, res);

      expect(res.statusCode).toBe(201);
      const data = JSON.parse(res.body);
      expect(data.success).toBe(true);
      expect(data.trackingCode).toBe('REG-2026-TEST');
    });
  });
});
