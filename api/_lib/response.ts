import type { IncomingMessage, ServerResponse } from 'node:http';

export function setCorsHeaders(res: ServerResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
}

export function handlePreflight(req: IncomingMessage, res: ServerResponse): boolean {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
}

export function checkMethod(
  req: IncomingMessage,
  res: ServerResponse,
  allowedMethods: string[]
): boolean {
  setCorsHeaders(res);
  if (!req.method || !allowedMethods.includes(req.method.toUpperCase())) {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: `Method ${req.method || 'UNKNOWN'} Not Allowed. Expected one of: ${allowedMethods.join(', ')}`,
      })
    );
    return false;
  }
  return true;
}

export function sendJson(res: ServerResponse, statusCode: number, data: any): void {
  setCorsHeaders(res);
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function sendError(
  res: ServerResponse,
  statusCode: number,
  message: string,
  code?: string
): void {
  sendJson(res, statusCode, {
    error: message,
    code: code || 'ERROR',
    status: statusCode,
  });
}

/**
 * Parses request body with strict 1MB size limit and catches malformed JSON.
 */
export async function parseBody<T = any>(req: IncomingMessage, maxSize: number = 1024 * 1024): Promise<T> {
  // If body is already parsed by framework / middleware
  if ((req as any).body && typeof (req as any).body === 'object') {
    return (req as any).body as T;
  }

  return new Promise((resolve, reject) => {
    let raw = '';
    let bytesReceived = 0;

    req.on('data', (chunk) => {
      bytesReceived += chunk.length;
      if (bytesReceived > maxSize) {
        req.destroy();
        const err = new Error('Payload Too Large: Maximum allowed request size is 1MB');
        (err as any).statusCode = 413;
        reject(err);
        return;
      }
      raw += chunk;
    });

    req.on('end', () => {
      if (!raw || raw.trim() === '') {
        resolve({} as T);
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        resolve(parsed);
      } catch {
        const err = new Error('Malformed JSON payload in request body');
        (err as any).statusCode = 400;
        reject(err);
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}

const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

function sanitizeIp(ip: string): string {
  if (!ip || typeof ip !== 'string') return '';
  let clean = ip.trim();
  // Strip IPv4-mapped IPv6 prefix (e.g. ::ffff:203.0.113.195)
  clean = clean.replace(/^::ffff:/i, '');
  // Strip enclosing brackets for IPv6 with optional port (e.g. [2001:db8::1]:8080 -> 2001:db8::1)
  if (clean.startsWith('[') && clean.includes(']')) {
    clean = clean.slice(1, clean.indexOf(']'));
  } else if (clean.includes('.') && clean.includes(':')) {
    // Strip port from IPv4 address (e.g. 203.0.113.195:8080 -> 203.0.113.195)
    clean = clean.split(':')[0].trim();
  }
  return clean;
}

function isValidIp(ip: string): boolean {
  if (!ip || typeof ip !== 'string') return false;
  const clean = sanitizeIp(ip);
  if (IPV4_REGEX.test(clean)) return true;
  // Valid IPv6 check: at least 2 colons, valid hex segments, no triple colons, max 45 chars
  if (
    clean.includes(':') &&
    (clean.match(/:/g) || []).length >= 2 &&
    !clean.includes(':::') &&
    /^[0-9a-fA-F:]+$/.test(clean) &&
    clean.length <= 45
  ) {
    return true;
  }
  return false;
}

function getHeaderString(header: string | string[] | undefined): string | undefined {
  if (!header) return undefined;
  if (Array.isArray(header)) return header.join(',');
  return typeof header === 'string' ? header : undefined;
}

/**
 * Extracts remote client IP address using documented trusted proxy rules.
 * 
 * Hosting & Proxy Trust Model:
 * 1. In Vercel serverless deployments, `x-vercel-ip` is injected directly by Vercel edge routers
 *    and overrides any client-supplied header of the same name.
 * 2. In `x-forwarded-for`, Vercel edge routers append the connecting client IP to the END of the list.
 *    The leftmost entries can be arbitrarily injected/spoofed by clients; therefore, we evaluate from right to left.
 * 3. `x-real-ip` is considered only after rightmost `x-forwarded-for`.
 * 4. Falls back to socket remote address or conservative localhost '127.0.0.1' when headers are unavailable.
 * 
 * Staging Assumption to Validate:
 * If a custom domain is fronted by Cloudflare Proxy before reaching Vercel without Authenticated Origin Pulls,
 * `x-vercel-ip` will be Cloudflare's egress server IP rather than the end-user's IP.
 */
export function getClientIp(req: IncomingMessage): string {
  // 1. Trusted Vercel Edge IP header
  const vercelIp = getHeaderString(req.headers['x-vercel-ip']);
  if (vercelIp) {
    const clean = sanitizeIp(vercelIp);
    if (isValidIp(clean)) return clean;
  }

  // 2. X-Forwarded-For parsing (inspect rightmost edge-appended address first)
  const forwardedFor = getHeaderString(req.headers['x-forwarded-for']);
  if (forwardedFor && forwardedFor.trim() !== '') {
    const parts = forwardedFor.split(',').map((p) => sanitizeIp(p.trim())).filter(Boolean);
    for (let i = parts.length - 1; i >= 0; i--) {
      if (isValidIp(parts[i])) {
        return parts[i];
      }
    }
  }

  // 3. Trusted reverse-proxy Real IP header
  const realIp = getHeaderString(req.headers['x-real-ip']);
  if (realIp) {
    const clean = sanitizeIp(realIp);
    if (isValidIp(clean)) return clean;
  }

  // 4. Socket remote address fallback
  if (req.socket?.remoteAddress) {
    const clean = sanitizeIp(req.socket.remoteAddress);
    if (isValidIp(clean)) return clean;
  }

  return '127.0.0.1';
}
