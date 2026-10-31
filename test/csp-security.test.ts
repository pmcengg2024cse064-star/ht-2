import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { setCorsHeaders } from '../api/_lib/response';

describe('Content Security Policy (CSP) Configuration', () => {
  const rootDir = path.resolve(__dirname, '..');
  const vercelJsonPath = path.join(rootDir, 'vercel.json');
  const indexHtmlPath = path.join(rootDir, 'index.html');

  describe('vercel.json Security Headers', () => {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));
    const headersConfig = vercelConfig.headers?.find((h: any) => h.source === '/(.*)');
    const headersList: { key: string; value: string }[] = headersConfig?.headers || [];
    const getHeader = (key: string) => headersList.find((h) => h.key.toLowerCase() === key.toLowerCase())?.value;

    it('defines an authoritative Content-Security-Policy header for all routes', () => {
      const csp = getHeader('Content-Security-Policy');
      expect(csp).toBeDefined();
      expect(typeof csp).toBe('string');
    });

    it('allows Cloudflare Turnstile scripts, frames, and connect-src', () => {
      const csp = getHeader('Content-Security-Policy')!;
      expect(csp).toMatch(/script-src[^;]*https:\/\/challenges\.cloudflare\.com/);
      expect(csp).toMatch(/frame-src[^;]*https:\/\/challenges\.cloudflare\.com/);
      expect(csp).toMatch(/connect-src[^;]*https:\/\/challenges\.cloudflare\.com/);
    });

    it('strictly includes "data:" in connect-src to resolve Turnstile infinite loading ("Connecting to data:,")', () => {
      const csp = getHeader('Content-Security-Policy')!;
      const connectMatch = csp.match(/connect-src\s+([^;]+)/);
      expect(connectMatch).not.toBeNull();
      const connectSources = connectMatch![1].split(/\s+/);
      expect(connectSources).toContain('data:');
    });

    it('does NOT permit "data:" or "unsafe-eval" in script-src to prevent script injection', () => {
      const csp = getHeader('Content-Security-Policy')!;
      const scriptMatch = csp.match(/script-src\s+([^;]+)/);
      expect(scriptMatch).not.toBeNull();
      const scriptSources = scriptMatch![1].split(/\s+/);
      expect(scriptSources).not.toContain('data:');
      expect(scriptSources).not.toContain("'unsafe-eval'");
    });

    it('allows Supabase API, Google Fonts, and Google Maps required by application features', () => {
      const csp = getHeader('Content-Security-Policy')!;
      expect(csp).toMatch(/connect-src[^;]*https:\/\/\*\.supabase\.co/);
      expect(csp).toMatch(/connect-src[^;]*wss:\/\/\*\.supabase\.co/);
      expect(csp).toMatch(/style-src[^;]*https:\/\/fonts\.googleapis\.com/);
      expect(csp).toMatch(/font-src[^;]*https:\/\/fonts\.gstatic\.com/);
      expect(csp).toMatch(/frame-src[^;]*https:\/\/maps\.google\.com/);
    });

    it('enforces modern browser security headers (nosniff, SAMEORIGIN, Referrer-Policy, Permissions-Policy)', () => {
      expect(getHeader('X-Content-Type-Options')).toBe('nosniff');
      expect(getHeader('X-Frame-Options')).toBe('SAMEORIGIN');
      expect(getHeader('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
      expect(getHeader('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=()');
    });
  });

  describe('index.html Meta CSP Fallback', () => {
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

    it('includes a meta http-equiv="Content-Security-Policy" tag matching Turnstile requirements', () => {
      expect(indexHtml).toContain('<meta http-equiv="Content-Security-Policy"');
      expect(indexHtml).toContain("https://challenges.cloudflare.com");
      expect(indexHtml).toContain("data: https://challenges.cloudflare.com");
    });
  });

  describe('API Serverless Response Security Headers', () => {
    it('sets hardened API-level CSP and framing headers on ServerResponse', () => {
      const headers: Record<string, string> = {};
      const mockRes: any = {
        setHeader: (k: string, v: string) => {
          headers[k.toLowerCase()] = v;
        },
      };

      setCorsHeaders(mockRes);

      expect(headers['content-security-policy']).toBe("default-src 'none'; frame-ancestors 'none';");
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['x-frame-options']).toBe('DENY');
      expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    });
  });
});
