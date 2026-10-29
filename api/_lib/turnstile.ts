import { getServerEnv } from './env';

export interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export interface TurnstileVerificationOptions {
  remoteIp?: string;
  expectedAction?: string;
}

/**
 * Validates a Cloudflare Turnstile token on the server against Cloudflare's official siteverify API.
 * Never trusts client-side validation flags.
 * 
 * Enforces:
 * 1. Cloudflare verification response success === true.
 * 2. Hostname validation against an explicit server-side allowlist (rejects cross-site/token-reuse attacks).
 * 3. Action validation if expectedAction is configured.
 * 4. Safe timeout via AbortSignal to avoid hanging serverless execution.
 */
export async function verifyTurnstileToken(
  token: string | undefined,
  options?: TurnstileVerificationOptions | string
): Promise<{ success: boolean; errorCodes?: string[] }> {
  const remoteIp = typeof options === 'string' ? options : options?.remoteIp;
  const expectedAction = typeof options === 'object' ? options?.expectedAction : undefined;

  const env = getServerEnv();

  // If secret key is not configured (e.g. local dev / staging before credentials provided)
  if (!env.TURNSTILE_SECRET_KEY || env.TURNSTILE_SECRET_KEY.trim() === '') {
    if (env.IS_PRODUCTION) {
      console.error('[Turnstile Security] TURNSTILE_SECRET_KEY is missing in production!');
      return { success: false, errorCodes: ['missing-turnstile-secret-config'] };
    }
    // In local non-production environment, allow request through with warning
    console.warn('[Turnstile Dev Warning] TURNSTILE_SECRET_KEY not set. Bypassing check in non-production mode.');
    return { success: true };
  }

  // Token is mandatory when Turnstile secret is active
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return { success: false, errorCodes: ['missing-input-response'] };
  }

  // Test bypass token for automated testing environments (strictly disabled in production)
  if (token === 'TEST_PASS_TOKEN' && !env.IS_PRODUCTION) {
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', env.TURNSTILE_SECRET_KEY);
    formData.append('response', token.trim());
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second safe timeout

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      signal: controller.signal,
    }).finally(() => {
      clearTimeout(timeoutId);
    });

    if (!res.ok) {
      console.error(`[Turnstile] Verification HTTP error: ${res.status}`);
      return { success: false, errorCodes: [`http-status-${res.status}`] };
    }

    const data = (await res.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      return {
        success: false,
        errorCodes: data['error-codes'] || ['invalid-turnstile-response'],
      };
    }

    // 1. Hostname Validation
    if (data.hostname) {
      const returnedHostname = data.hostname.toLowerCase().trim();
      const isAllowedHostname = env.TURNSTILE_ALLOWED_HOSTNAMES.some((allowed) => {
        const allowedClean = allowed.toLowerCase().trim();
        return (
          returnedHostname === allowedClean ||
          returnedHostname.endsWith(`.${allowedClean}`)
        );
      });

      if (!isAllowedHostname) {
        console.error(`[Turnstile Security] Hostname mismatch. Returned: "${returnedHostname}", Allowed:`, env.TURNSTILE_ALLOWED_HOSTNAMES);
        return { success: false, errorCodes: ['hostname-mismatch'] };
      }
    }

    // 2. Action Validation (if expectedAction is configured)
    if (expectedAction) {
      const returnedAction = (data.action || '').trim();
      if (!returnedAction || returnedAction !== expectedAction.trim()) {
        console.error(`[Turnstile Security] Action mismatch or missing. Expected: "${expectedAction}", Got: "${returnedAction || '(none)'}"`);
        return { success: false, errorCodes: ['action-mismatch'] };
      }
    }

    return {
      success: true,
    };
  } catch (err: any) {
    console.error('[Turnstile] Verification exception:', err?.message || err);
    return { success: false, errorCodes: ['verification-network-error'] };
  }
}
