import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, parseBody, sendError, sendJson, getClientIp } from '../_lib/response';
import { authenticateStaffRequest, hasRequiredRole } from '../_lib/auth';
import { getSupabaseServerClient } from '../_lib/supabaseServer';
import { logAuditEvent } from '../_lib/audit';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET', 'PATCH', 'DELETE'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    return sendError(res, authResult.status, authResult.error, 'UNAUTHORIZED');
  }

  const staff = authResult.auth.profile;
  const clientIp = getClientIp(req);
  const supabase = getSupabaseServerClient();

  // 1. GET: List registrations (all active staff have view access)
  if (req.method === 'GET') {
    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '20', 10)));
    const offset = (page - 1) * limit;

    let query = supabase
      .from('training_registrations')
      .select('*, admin_profiles:assigned_to(full_name, email)', { count: 'exact' });

    if (status && status !== 'ALL') {
      query = query.eq('status', status as any);
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      query = query.or(`candidate_name.ilike.${term},whatsapp_number.ilike.${term},email.ilike.${term},registration_code.ilike.${term}`);
    }

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

    const { data, count, error } = await query;
    if (error) {
      console.error('[Admin Registrations API] Query failed:', error.message);
      return sendError(res, 500, 'Failed to fetch registrations.', 'DB_ERROR');
    }

    return sendJson(res, 200, {
      success: true,
      registrations: data,
      totalCount: count || 0,
      page,
      limit,
    });
  }

  // 2. PATCH: Update registration status, assignment, or internal notes
  if (req.method === 'PATCH') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Admins can modify registration records.', 'FORBIDDEN');
    }

    let body: any;
    try {
      body = await parseBody(req);
    } catch {
      return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
    }

    const { id, status, assignedTo, internalNotes } = body;
    if (!id || typeof id !== 'string') {
      return sendError(res, 400, 'Registration ID is required.', 'MISSING_ID');
    }

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    const allowedStatuses = ['NEW', 'CONTACTED', 'IN_SCOPING', 'PROPOSAL_SENT', 'WON', 'CLOSED'];
    if (status) {
      if (!allowedStatuses.includes(status)) {
        return sendError(res, 400, `Invalid status value.`, 'INVALID_STATUS');
      }
      updatePayload.status = status;
    }

    if (assignedTo !== undefined) {
      if (!assignedTo || assignedTo === '' || assignedTo === null) {
        updatePayload.assigned_to = null;
      } else {
        if (typeof assignedTo !== 'string') {
          return sendError(res, 400, 'Assigned staff ID must be a valid UUID string.', 'INVALID_STAFF_ID');
        }
        const trimmedStaffId = assignedTo.trim();
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!UUID_REGEX.test(trimmedStaffId)) {
          return sendError(res, 400, 'Assigned staff ID is not a valid UUID format.', 'INVALID_STAFF_ID');
        }

        const { data: staffProfile, error: staffError } = await supabase
          .from('admin_profiles')
          .select('id, is_active')
          .eq('id', trimmedStaffId)
          .single();

        if (staffError || !staffProfile) {
          return sendError(res, 400, 'Target staff profile does not exist in the administrative system.', 'STAFF_NOT_FOUND');
        }

        if (!staffProfile.is_active) {
          return sendError(res, 400, 'Cannot assign registration to an inactive or suspended staff member.', 'STAFF_INACTIVE');
        }

        updatePayload.assigned_to = trimmedStaffId;
      }
    }

    if (internalNotes !== undefined) {
      updatePayload.internal_notes = internalNotes;
    }

    const { data, error } = await supabase
      .from('training_registrations')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('[Admin Registrations API] Update failed:', error?.message || error);
      return sendError(res, 500, 'Failed to update registration.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'UPDATE_TRAINING_REGISTRATION',
      entityType: 'training_registrations',
      entityId: id,
      details: {
        updatedFields: Object.keys(updatePayload),
        newStatus: updatePayload.status,
      },
      ipAddress: clientIp,
    });

    return sendJson(res, 200, {
      success: true,
      registration: data,
      message: 'Registration updated successfully.',
    });
  }

  // 3. DELETE: Super Admin only
  if (req.method === 'DELETE') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Super Admins can delete registration records.', 'FORBIDDEN');
    }

    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const id = url.searchParams.get('id');
    if (!id) {
      return sendError(res, 400, 'Registration ID is required.', 'MISSING_ID');
    }

    const { error } = await supabase.from('training_registrations').delete().eq('id', id);
    if (error) {
      console.error('[Admin Registrations API] Delete failed:', error.message);
      return sendError(res, 500, 'Failed to delete registration.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'DELETE_TRAINING_REGISTRATION',
      entityType: 'training_registrations',
      entityId: id,
      ipAddress: clientIp,
    });

    return sendJson(res, 200, {
      success: true,
      message: 'Registration record deleted successfully.',
    });
  }
}
