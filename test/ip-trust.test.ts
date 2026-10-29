import { describe, it, expect } from 'vitest';
import { getClientIp } from '../api/_lib/response';
import type { IncomingMessage } from 'node:http';

function mockReq(headers: Record<string, string | string[] | undefined>, socketRemote?: string): IncomingMessage {
  return {
    headers,
    socket: socketRemote ? ({ remoteAddress: socketRemote } as any) : ({} as any),
  } as unknown as IncomingMessage;
}

describe('Client IP Extraction and Proxy Trust (`getClientIp`)', () => {
  it('extracts trusted IP from x-vercel-ip header', () => {
    const req = mockReq({
      'x-vercel-ip': '203.0.113.195',
      'x-forwarded-for': '198.51.100.1, 198.51.100.2',
    });
    expect(getClientIp(req)).toBe('203.0.113.195');
  });

  it('strips port from x-vercel-ip if provided with port', () => {
    const req = mockReq({
      'x-vercel-ip': '203.0.113.195:443',
    });
    expect(getClientIp(req)).toBe('203.0.113.195');
  });

  it('strips IPv4-mapped IPv6 prefix (::ffff:)', () => {
    const req = mockReq({
      'x-vercel-ip': '::ffff:203.0.113.195',
    });
    expect(getClientIp(req)).toBe('203.0.113.195');
  });

  it('handles bracketed IPv6 addresses with and without port', () => {
    const reqWithPort = mockReq({
      'x-vercel-ip': '[2001:db8::1]:8080',
    });
    expect(getClientIp(reqWithPort)).toBe('2001:db8::1');

    const reqWithoutPort = mockReq({
      'x-vercel-ip': '[2001:db8::1]',
    });
    expect(getClientIp(reqWithoutPort)).toBe('2001:db8::1');
  });

  it('evaluates rightmost address in x-forwarded-for when x-vercel-ip is missing', () => {
    // Client may spoof leftmost entry (e.g. 1.1.1.1), but edge proxy appends 203.0.113.50 to the right
    const req = mockReq({
      'x-forwarded-for': '1.1.1.1, 10.0.0.1, 203.0.113.50',
    });
    expect(getClientIp(req)).toBe('203.0.113.50');
  });

  it('handles array-based x-forwarded-for headers from Node.js HTTP parser', () => {
    const req = mockReq({
      'x-forwarded-for': ['1.1.1.1', '198.51.100.22'],
    });
    expect(getClientIp(req)).toBe('198.51.100.22');
  });

  it('skips malformed IPs in x-forwarded-for and finds nearest valid IP', () => {
    const req = mockReq({
      'x-forwarded-for': '203.0.113.10, malformed-garbage-entry, 999.999.999.999',
    });
    expect(getClientIp(req)).toBe('203.0.113.10');
  });

  it('falls back to x-real-ip if x-vercel-ip and x-forwarded-for are absent', () => {
    const req = mockReq({
      'x-real-ip': '198.51.100.77',
    });
    expect(getClientIp(req)).toBe('198.51.100.77');
  });

  it('falls back to socket remoteAddress if headers are absent', () => {
    const req = mockReq({}, '192.168.1.50');
    expect(getClientIp(req)).toBe('192.168.1.50');
  });

  it('falls back safely to 127.0.0.1 if all headers and socket address are absent or malformed', () => {
    const req = mockReq({
      'x-forwarded-for': 'not-an-ip',
    });
    expect(getClientIp(req)).toBe('127.0.0.1');
  });
});
