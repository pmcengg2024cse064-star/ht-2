import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, sendError, sendJson } from '../_lib/response.js';
import { authenticateStaffRequest, hasRequiredRole, type AuthContext } from '../_lib/auth.js';
import { getSupabaseServerClient } from '../_lib/supabaseServer.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    const failure = authResult as { success: false; status: number; error: string };
    return sendError(res, failure.status, failure.error, 'UNAUTHORIZED');
  }

  const staff = (authResult as { success: true; auth: AuthContext }).auth.profile;
  if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'])) {
    return sendError(res, 403, 'Access denied: Instructors cannot view audit logs.', 'FORBIDDEN');
  }

  const supabase = getSupabaseServerClient();
  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const entityType = url.searchParams.get('entityType');
  const action = url.searchParams.get('action');
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '25', 10)));
  const offset = (page - 1) * limit;

  let query = supabase
    .from('audit_logs')
    .select('*, admin_profiles:admin_id(full_name, email)', { count: 'exact' });

  if (entityType && entityType !== 'ALL') {
    query = query.eq('entity_type', entityType);
  }
  if (action && action !== 'ALL') {
    query = query.eq('action', action);
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) {
    console.error('[Admin Audit Logs API] Query error:', error.message);
    return sendError(res, 500, 'Failed to fetch audit logs.', 'DB_ERROR');
  }

  return sendJson(res, 200, {
    success: true,
    logs: data || [],
    totalCount: count || 0,
    page,
    limit,
  });
}
