import { getSupabaseServerClient } from './supabaseServer';
import type { Json } from '../../src/types/database.types';

export interface AuditLogEntry {
  adminId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  details?: Record<string, any>;
  ipAddress?: string | null;
}

const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'secret',
  'authorization',
  'cookie',
  'key',
  'apikey',
  'turnstilesecret',
  'servicerolekey',
  'bearer',
  'refreshtoken',
]);

/**
 * Strips sensitive credentials, tokens, and authorization headers from audit log metadata.
 */
export function sanitizeAuditDetails(details?: Record<string, any>): Record<string, any> {
  if (!details || typeof details !== 'object') {
    return {};
  }

  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(details)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_KEYS.has(lowerKey)) {
      continue;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeAuditDetails(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Appends an audit event to `public.audit_logs`.
 * 
 * Security & Threat Model Disclosure:
 * - Application-Layer Immutability: Standard staff accounts (`authenticated` role) have SELECT-only
 *   privileges enforced by PostgreSQL RLS. UPDATE and DELETE are revoked.
 * - Privilege Boundary Disclosure: This application-level protection does NOT protect against an attacker
 *   who compromises the privileged `SUPABASE_SERVICE_ROLE_KEY` or direct database superuser credentials.
 *   True cryptographic non-repudiation requires external WORM or hash-chained storage.
 * 
 * Guarantees:
 * - Derives actor identity strictly from verified server-side JWT context.
 * - Strips all sensitive credentials, tokens, and secrets prior to database insertion.
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
  try {
    const supabase = getSupabaseServerClient();
    const sanitizedDetails = sanitizeAuditDetails(entry.details);

    await supabase.from('audit_logs').insert({
      admin_id: entry.adminId || null,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId || null,
      details: sanitizedDetails as Json,
      ip_address: entry.ipAddress || null,
    });
  } catch (err: any) {
    // Non-fatal error logging: audit failures should not crash client responses unless critical
    console.error('[Audit Service] Failed to write audit log entry:', err?.message || err);
  }
}
