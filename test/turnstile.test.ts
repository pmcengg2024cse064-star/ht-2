import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyTurnstileToken } from '../api/_lib/turnstile';
import * as envModule from '../api/_lib/env';

describe('Cloudflare Turnstile Anti-Bot Verification', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('rejects missing or empty token when secret key is configured', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com', 'localhost'],
      IS_PRODUCTION: true,
    } as any);

    const emptyResult = await verifyTurnstileToken('');
    expect(emptyResult.success).toBe(false);
    expect(emptyResult.errorCodes).toContain('missing-input-response');

    const undefinedResult = await verifyTurnstileToken(undefined);
    expect(undefinedResult.success).toBe(false);
  });

  it('rejects submission in production if TURNSTILE_SECRET_KEY is missing', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com'],
      IS_PRODUCTION: true,
    } as any);

    const result = await verifyTurnstileToken('some-token');
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('missing-turnstile-secret-config');
  });

  it('rejects when Cloudflare siteverify endpoint returns success: false', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '0x4AAAAAAtestkey',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com'],
      IS_PRODUCTION: true,
    } as any);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: false,
        'error-codes': ['invalid-input-response'],
      }),
    } as any);

    const result = await verifyTurnstileToken('invalid-bot-token');
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('invalid-input-response');
  });

  it('accepts when Cloudflare siteverify returns success with approved hostname and action', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '0x4AAAAAAtestkey',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com', 'localhost'],
      IS_PRODUCTION: true,
    } as any);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        challenge_ts: new Date().toISOString(),
        hostname: 'hackuptechnology.com',
        action: 'service_enquiry',
      }),
    } as any);

    const result = await verifyTurnstileToken('valid-human-token', {
      remoteIp: '203.0.113.195',
      expectedAction: 'service_enquiry',
    });
    expect(result.success).toBe(true);
  });

  it('rejects when token is solved on an unapproved foreign hostname (hostname-mismatch)', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '0x4AAAAAAtestkey',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com', 'staging.hackuptechnology.com'],
      IS_PRODUCTION: true,
    } as any);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        hostname: 'malicious-phishing-domain.com', // Unapproved foreign host
      }),
    } as any);

    const result = await verifyTurnstileToken('valid-token-from-foreign-domain');
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('hostname-mismatch');
  });

  it('rejects when action does not match expected form action (action-mismatch)', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '0x4AAAAAAtestkey',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com'],
      IS_PRODUCTION: true,
    } as any);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        hostname: 'hackuptechnology.com',
        action: 'login', // Expected: service_enquiry
      }),
    } as any);

    const result = await verifyTurnstileToken('valid-token', {
      expectedAction: 'service_enquiry',
    });
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('action-mismatch');
  });

  it('rejects when action is missing from response but expectedAction is configured', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '0x4AAAAAAtestkey',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com'],
      IS_PRODUCTION: true,
    } as any);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        hostname: 'hackuptechnology.com',
        // action omitted
      }),
    } as any);

    const result = await verifyTurnstileToken('valid-token', {
      expectedAction: 'service_enquiry',
    });
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('action-mismatch');
  });

  it('accepts training_registration action when matching expectedAction', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '0x4AAAAAAtestkey',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com'],
      IS_PRODUCTION: true,
    } as any);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        hostname: 'hackuptechnology.com',
        action: 'training_registration',
      }),
    } as any);

    const result = await verifyTurnstileToken('valid-token', {
      expectedAction: 'training_registration',
    });
    expect(result.success).toBe(true);
  });

  it('rejects TEST_PASS_TOKEN when running in production environment', async () => {
    vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
      TURNSTILE_SECRET_KEY: '0x4AAAAAAtestkey',
      TURNSTILE_ALLOWED_HOSTNAMES: ['hackuptechnology.com'],
      IS_PRODUCTION: true, // In production, TEST_PASS_TOKEN must NOT be bypassed
    } as any);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: false,
        'error-codes': ['invalid-input-response'],
      }),
    } as any);

    const result = await verifyTurnstileToken('TEST_PASS_TOKEN');
    expect(result.success).toBe(false);
  });
});
