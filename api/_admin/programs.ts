import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, parseBody, sendError, sendJson, getClientIp } from '../_lib/response';
import { authenticateStaffRequest, hasRequiredRole } from '../_lib/auth';
import { getSupabaseServerClient } from '../_lib/supabaseServer';
import { logAuditEvent } from '../_lib/audit';
import type { Database } from '../../src/types/database.types';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET', 'POST', 'PATCH', 'DELETE'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    return sendError(res, authResult.status, authResult.error, 'UNAUTHORIZED');
  }

  const staff = authResult.auth.profile;
  const clientIp = getClientIp(req);
  const supabase = getSupabaseServerClient();

  // 1. GET: List all programs (including drafts) and their batches
  if (req.method === 'GET') {
    const { data: programs, error: progError } = await supabase
      .from('training_programs')
      .select('*, training_batches(*)')
      .order('display_order', { ascending: true });

    if (progError) {
      console.error('[Admin Programs API] Query failed:', progError.message);
      return sendError(res, 500, 'Failed to fetch training programs.', 'DB_ERROR');
    }

    return sendJson(res, 200, {
      success: true,
      programs: programs || [],
    });
  }

  // 2. POST: Create new training program
  if (req.method === 'POST') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Admins can create training programs.', 'FORBIDDEN');
    }

    let body: any;
    try {
      body = await parseBody(req);
    } catch {
      return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
    }

    const { slug, title, category, duration, level, isPublished, displayOrder } = body;
    if (!slug || !title || !category || !duration || !level) {
      return sendError(res, 400, 'Missing required fields: slug, title, category, duration, level.', 'VALIDATION_ERROR');
    }

    const { data, error } = await supabase
      .from('training_programs')
      .insert({
        slug: slug.trim().toLowerCase(),
        title: title.trim(),
        category: category.trim(),
        duration: duration.trim(),
        level: level.trim(),
        is_published: typeof isPublished === 'boolean' ? isPublished : true,
        display_order: typeof displayOrder === 'number' ? displayOrder : 0,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('[Admin Programs API] Insert failed:', error?.message || error);
      return sendError(res, 500, error?.message || 'Failed to create training program.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'CREATE_TRAINING_PROGRAM',
      entityType: 'training_programs',
      entityId: data.id,
      details: { title: data.title, slug: data.slug },
      ipAddress: clientIp,
    });

    return sendJson(res, 201, {
      success: true,
      program: data,
      message: 'Training program created successfully.',
    });
  }

  // 3. PATCH: Update training program
  if (req.method === 'PATCH') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Admins can modify training programs.', 'FORBIDDEN');
    }

    let body: any;
    try {
      body = await parseBody(req);
    } catch {
      return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
    }

    const { id, slug, title, category, duration, level, isPublished, displayOrder } = body;
    if (!id) {
      return sendError(res, 400, 'Program ID is required.', 'MISSING_ID');
    }

    const updates: Database['public']['Tables']['training_programs']['Update'] = {
      updated_at: new Date().toISOString(),
    };
    if (slug) updates.slug = slug.trim().toLowerCase();
    if (title) updates.title = title.trim();
    if (category) updates.category = category.trim();
    if (duration) updates.duration = duration.trim();
    if (level) updates.level = level.trim();
    if (typeof isPublished === 'boolean') updates.is_published = isPublished;
    if (typeof displayOrder === 'number') updates.display_order = displayOrder;

    const { data, error } = await supabase
      .from('training_programs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('[Admin Programs API] Update failed:', error?.message || error);
      return sendError(res, 500, error?.message || 'Failed to update training program.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'UPDATE_TRAINING_PROGRAM',
      entityType: 'training_programs',
      entityId: id,
      details: { updatedFields: Object.keys(updates) },
      ipAddress: clientIp,
    });

    return sendJson(res, 200, {
      success: true,
      program: data,
      message: 'Training program updated successfully.',
    });
  }

  // 4. DELETE: Super Admin only
  if (req.method === 'DELETE') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Super Admins can delete training programs.', 'FORBIDDEN');
    }

    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const id = url.searchParams.get('id');
    if (!id) {
      return sendError(res, 400, 'Program ID is required.', 'MISSING_ID');
    }

    const { error } = await supabase.from('training_programs').delete().eq('id', id);
    if (error) {
      console.error('[Admin Programs API] Delete failed:', error.message);
      return sendError(res, 500, 'Failed to delete program.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'DELETE_TRAINING_PROGRAM',
      entityType: 'training_programs',
      entityId: id,
      ipAddress: clientIp,
    });

    return sendJson(res, 200, {
      success: true,
      message: 'Program deleted successfully.',
    });
  }
}
