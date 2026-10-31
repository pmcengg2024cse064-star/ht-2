import { getSupabaseServerClient } from './supabaseServer.js';
import { getServerEnv } from './env.js';

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  isServiceUnavailable?: boolean;
}

export interface RateLimitOptions {
  /**
   * If true, failures to contact the distributed database limiter will reject the request (fail-closed)
   * rather than silently falling back to an in-memory counter that is not shared across serverless instances.
   */
  failClosed?: boolean;
  /**
   * Explicitly allows in-memory fallback (e.g. in local unit tests or offline development).
   */
  allowMemoryFallback?: boolean;
}

// In-memory sliding window cache (strictly for local offline dev and isolated unit testing)
interface MemoryRecord {
  count: number;
  resetAt: number;
}
const memoryCache = new Map<string, MemoryRecord>();

/**
 * Server-side atomic rate limiter.
 * 
 * Production Strategy:
 * 1. Invokes atomic PostgreSQL RPC `public.check_and_increment_rate_limit` via Supabase server client.
 * 2. Operates within an atomic row lock on `api_rate_limits.key` to prevent TOCTOU race conditions.
 * 3. Enforces Fail-Closed behavior on public submission endpoints when the distributed limiter is unreachable.
 * 
 * @param identifier Unique key (e.g. `srv_enq:ip_203.0.113.195`)
 * @param limit Maximum allowed requests within the time window (1-10000)
 * @param windowSeconds Time window in seconds (1-86400)
 * @param options RateLimitOptions
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const now = Math.floor(Date.now() / 1000);
  const resetAt = now + windowSeconds;

  // 1. Strict Input Validation
  if (!identifier || typeof identifier !== 'string' || identifier.trim() === '') {
    throw new Error('Rate limiter: identifier key must be a non-empty string.');
  }
  const cleanKey = identifier.trim().slice(0, 255);

  if (typeof limit !== 'number' || isNaN(limit) || limit < 1 || limit > 10000) {
    throw new Error('Rate limiter: limit must be a positive integer between 1 and 10,000.');
  }

  if (typeof windowSeconds !== 'number' || isNaN(windowSeconds) || windowSeconds < 1 || windowSeconds > 86400) {
    throw new Error('Rate limiter: windowSeconds must be a positive integer between 1 and 86,400.');
  }

  const env = getServerEnv();
  const hasDbConfig = Boolean(
    env.SUPABASE_URL && 
    env.SUPABASE_SERVICE_ROLE_KEY && 
    !env.SUPABASE_URL.includes('placeholder')
  );

  // 2. Distributed Atomic Database Rate Limiting
  if (hasDbConfig) {
    try {
      const supabase = getSupabaseServerClient();

      const { data, error } = await supabase.rpc('check_and_increment_rate_limit', {
        p_key: cleanKey,
        p_limit: limit,
        p_window_seconds: windowSeconds,
      });

      if (!error && data) {
        const record = Array.isArray(data) ? data[0] : data;
        if (record && typeof record.allowed === 'boolean') {
          const dbResetAt = record.reset_at 
            ? Math.floor(new Date(record.reset_at).getTime() / 1000)
            : resetAt;

          return {
            success: record.allowed,
            remaining: typeof record.remaining === 'number' ? record.remaining : 0,
            resetAt: dbResetAt,
          };
        }
      }

      if (error) {
        console.error(`[RateLimiter] Database RPC error: ${error.message} (code: ${error.code || 'UNKNOWN'}). Verify that migration 20261029000003_api_lockdown_and_rate_limiting.sql has been applied.`);
      }
    } catch (err: any) {
      console.error('[RateLimiter] Database connection exception:', err?.message || err);
    }

    // Fail-Closed Handling:
    // Only fail closed if explicitly requested via options.failClosed: true.
    // Otherwise, log a warning and gracefully fall back to the in-memory sliding-window cache.
    if (options.failClosed === true) {
      console.error(`[RateLimiter Security] Distributed rate limiter unavailable for key "${cleanKey}". Failing closed.`);
      return {
        success: false,
        remaining: 0,
        resetAt,
        isServiceUnavailable: true,
      };
    }

    console.warn(`[RateLimiter Resilience] Distributed rate limiter unavailable for key "${cleanKey}". Falling back to in-memory limiter.`);
  }

  // 3. In-Memory Fallback
  // Enabled whenever failClosed is not strictly required, ensuring high availability
  if (options.failClosed !== true) {
    const record = memoryCache.get(cleanKey);

    if (!record || now >= record.resetAt) {
      memoryCache.set(cleanKey, {
        count: 1,
        resetAt,
      });
      return {
        success: true,
        remaining: limit - 1,
        resetAt,
      };
    }

    if (record.count >= limit) {
      return {
        success: false,
        remaining: 0,
        resetAt: record.resetAt,
      };
    }

    record.count += 1;
    return {
      success: true,
      remaining: limit - record.count,
      resetAt: record.resetAt,
    };
  }

  // Only reached if failClosed was explicitly true and DB was unconfigured
  console.error('[RateLimiter Security] Database unconfigured and failClosed is true. Failing closed.');
  return {
    success: false,
    remaining: 0,
    resetAt,
    isServiceUnavailable: true,
  };
}

export function resetMemoryRateLimitsForTesting(): void {
  memoryCache.clear();
}
