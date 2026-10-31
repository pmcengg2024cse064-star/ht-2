import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, parseBody, sendError, sendJson, getClientIp } from '../_lib/response.js';
import { authenticateStaffRequest, hasRequiredRole, type AuthContext } from '../_lib/auth.js';
import { getSupabaseServerClient } from '../_lib/supabaseServer.js';
import { logAuditEvent } from '../_lib/audit.js';
import type { TrainingMode, Database } from '../../src/types/database.types.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['POST', 'PATCH', 'DELETE'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    const failure = authResult as { success: false; status: number; error: string };
    return sendError(res, failure.status, failure.error, 'UNAUTHORIZED');
  }

  const staff = (authResult as { success: true; auth: AuthContext }).auth.profile;
  const clientIp = getClientIp(req);
  const supabase = getSupabaseServerClient();

  // 1. POST: Create new batch
  if (req.method === 'POST') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Admins can create batches.', 'FORBIDDEN');
    }

    let body: any;
    try {
      body = await parseBody(req);
    } catch {
      return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
    }

    const { programId, batchName, startDate, mode, seatsTotal, seatsAvailable, isActive } = body;
    if (!programId || !batchName || !startDate || !mode) {
      return sendError(res, 400, 'Missing required fields: programId, batchName, startDate, mode.', 'VALIDATION_ERROR');
    }

    const { data, error } = await supabase
      .from('training_batches')
      .insert({
        program_id: programId,
        batch_name: batchName.trim(),
        start_date: startDate,
        mode: mode as TrainingMode,
        seats_total: typeof seatsTotal === 'number' ? seatsTotal : 30,
        seats_available: typeof seatsAvailable === 'number' ? seatsAvailable : (seatsTotal || 30),
        is_active: typeof isActive === 'boolean' ? isActive : true,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('[Admin Batches API] Insert failed:', error?.message || error);
      return sendError(res, 500, error?.message || 'Failed to create batch.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'CREATE_TRAINING_BATCH',
      entityType: 'training_batches',
      entityId: data.id,
      details: { programId, batchName: data.batch_name },
      ipAddress: clientIp,
    });

    return sendJson(res, 201, {
      success: true,
      batch: data,
      message: 'Batch created successfully.',
    });
  }

  // 2. PATCH: Update batch
  if (req.method === 'PATCH') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Admins can modify batches.', 'FORBIDDEN');
    }

    let body: any;
    try {
      body = await parseBody(req);
    } catch {
      return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
    }

    const { id, batchName, startDate, mode, seatsTotal, seatsAvailable, isActive } = body;
    if (!id) {
      return sendError(res, 400, 'Batch ID is required.', 'MISSING_ID');
    }

    const updates: Database['public']['Tables']['training_batches']['Update'] = {
      updated_at: new Date().toISOString(),
    };
    if (batchName) updates.batch_name = batchName.trim();
    if (startDate) updates.start_date = startDate;
    if (mode) updates.mode = mode as TrainingMode;
    if (typeof seatsTotal === 'number') updates.seats_total = seatsTotal;
    if (typeof seatsAvailable === 'number') updates.seats_available = seatsAvailable;
    if (typeof isActive === 'boolean') updates.is_active = isActive;

    const { data, error } = await supabase
      .from('training_batches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('[Admin Batches API] Update failed:', error?.message || error);
      return sendError(res, 500, error?.message || 'Failed to update batch.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'UPDATE_TRAINING_BATCH',
      entityType: 'training_batches',
      entityId: id,
      details: { updatedFields: Object.keys(updates) },
      ipAddress: clientIp,
    });

    return sendJson(res, 200, {
      success: true,
      batch: data,
      message: 'Batch updated successfully.',
    });
  }

  // 3. DELETE: Super Admin only
  if (req.method === 'DELETE') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Super Admins can delete batches.', 'FORBIDDEN');
    }

    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const id = url.searchParams.get('id');
    if (!id) {
      return sendError(res, 400, 'Batch ID is required.', 'MISSING_ID');
    }

    const { error } = await supabase.from('training_batches').delete().eq('id', id);
    if (error) {
      console.error('[Admin Batches API] Delete failed:', error.message);
      return sendError(res, 500, 'Failed to delete batch.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'DELETE_TRAINING_BATCH',
      entityType: 'training_batches',
      entityId: id,
      ipAddress: clientIp,
    });

    return sendJson(res, 200, {
      success: true,
      message: 'Batch deleted successfully.',
    });
  }
}
