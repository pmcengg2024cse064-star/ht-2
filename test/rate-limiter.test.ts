import { describe, it, expect, beforeEach, vi } from 'vitest';
import { checkRateLimit, resetMemoryRateLimitsForTesting } from '../api/_lib/rateLimiter';
import * as supabaseServer from '../api/_lib/supabaseServer';
import * as envModule from '../api/_lib/env';

describe('Sliding-Window Rate Limiting Engine', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    resetMemoryRateLimitsForTesting();
  });

  describe('Input Validation', () => {
    it('rejects empty or whitespace rate limit keys', async () => {
      await expect(checkRateLimit('')).rejects.toThrow('non-empty string');
      await expect(checkRateLimit('   ')).rejects.toThrow('non-empty string');
    });

    it('rejects invalid limit values (<= 0 or > 10000)', async () => {
      await expect(checkRateLimit('test-key', 0, 60)).rejects.toThrow('between 1 and 10,000');
      await expect(checkRateLimit('test-key', -5, 60)).rejects.toThrow('between 1 and 10,000');
      await expect(checkRateLimit('test-key', 10001, 60)).rejects.toThrow('between 1 and 10,000');
    });

    it('rejects invalid window values (<= 0 or > 86400)', async () => {
      await expect(checkRateLimit('test-key', 10, 0)).rejects.toThrow('between 1 and 86,400');
      await expect(checkRateLimit('test-key', 10, 86401)).rejects.toThrow('between 1 and 86,400');
    });
  });

  describe('Distributed Database Rate Limiting via Atomic RPC', () => {
    it('calls atomic RPC check_and_increment_rate_limit when DB credentials are configured', async () => {
      vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
        SUPABASE_URL: 'https://test-project.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
        IS_PRODUCTION: true,
      } as any);

      const mockSupabase = {
        rpc: vi.fn().mockResolvedValue({
          data: [{
            allowed: true,
            remaining: 9,
            reset_at: new Date(Date.now() + 60000).toISOString(),
          }],
          error: null,
        }),
      };
      vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

      const result = await checkRateLimit('srv:ip_203.0.113.1', 10, 60);

      expect(mockSupabase.rpc).toHaveBeenCalledWith('check_and_increment_rate_limit', {
        p_key: 'srv:ip_203.0.113.1',
        p_limit: 10,
        p_window_seconds: 60,
      });
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(9);
    });

    it('enforces atomic concurrency: limits requests when RPC returns allowed: false', async () => {
      vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
        SUPABASE_URL: 'https://test-project.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
        IS_PRODUCTION: true,
      } as any);

      const mockSupabase = {
        rpc: vi.fn().mockResolvedValue({
          data: [{
            allowed: false,
            remaining: 0,
            reset_at: new Date(Date.now() + 30000).toISOString(),
          }],
          error: null,
        }),
      };
      vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

      const result = await checkRateLimit('srv:ip_203.0.113.1', 10, 60);
      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('enforces Fail-Closed behavior when database RPC fails in production or when failClosed: true', async () => {
      vi.spyOn(envModule, 'getServerEnv').mockReturnValue({
        SUPABASE_URL: 'https://test-project.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
        IS_PRODUCTION: true,
      } as any);

      const mockSupabase = {
        rpc: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Connection to Supabase timed out' },
        }),
      };
      vi.spyOn(supabaseServer, 'getSupabaseServerClient').mockReturnValue(mockSupabase as any);

      const result = await checkRateLimit('srv:ip_critical', 10, 60, { failClosed: true });

      // Must fail closed with 0 remaining and isServiceUnavailable: true
      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.isServiceUnavailable).toBe(true);
    });
  });

  describe('In-Memory Counter for Offline Dev and Unit Tests', () => {
    it('allows requests within the specified limit in offline test mode', async () => {
      const key = 'test:ip_192.168.1.1';
      const limit = 3;
      const windowSeconds = 10;

      const res1 = await checkRateLimit(key, limit, windowSeconds);
      expect(res1.success).toBe(true);
      expect(res1.remaining).toBe(2);

      const res2 = await checkRateLimit(key, limit, windowSeconds);
      expect(res2.success).toBe(true);
      expect(res2.remaining).toBe(1);

      const res3 = await checkRateLimit(key, limit, windowSeconds);
      expect(res3.success).toBe(true);
      expect(res3.remaining).toBe(0);

      // 4th request exceeds limit
      const res4 = await checkRateLimit(key, limit, windowSeconds);
      expect(res4.success).toBe(false);
      expect(res4.remaining).toBe(0);
    });

    it('tracks different keys independently in memory', async () => {
      const keyA = 'service:client_A';
      const keyB = 'service:client_B';

      await checkRateLimit(keyA, 1, 60);
      const blockedA = await checkRateLimit(keyA, 1, 60);
      expect(blockedA.success).toBe(false);

      // keyB should still be allowed
      const allowedB = await checkRateLimit(keyB, 1, 60);
      expect(allowedB.success).toBe(true);
    });
  });
});
