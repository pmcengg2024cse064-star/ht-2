import type { IncomingMessage, ServerResponse } from 'node:http';
import { createHash } from 'node:crypto';
import { checkMethod, handlePreflight, parseBody, sendError, sendJson, getClientIp } from '../_lib/response.js';
import { authenticateStaffRequest, hasRequiredRole, type AuthContext } from '../_lib/auth.js';
import { getSupabaseServerClient } from '../_lib/supabaseServer.js';
import { logAuditEvent } from '../_lib/audit.js';
import type { CertificateCategory, CertificateStatus, Database } from '../../src/types/database.types.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET', 'POST', 'PATCH', 'DELETE'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    const failure = authResult as { success: false; status: number; error: string };
    return sendError(res, failure.status, failure.error, 'UNAUTHORIZED');
  }

  const staff = (authResult as { success: true; auth: AuthContext }).auth.profile;
  const clientIp = getClientIp(req);
  const supabase = getSupabaseServerClient();

  // 1. GET: List certificates
  if (req.method === 'GET') {
    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const status = url.searchParams.get('status');
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '20', 10)));
    const offset = (page - 1) * limit;

    let query = supabase
      .from('certificates')
      .select('*, admin_profiles:created_by(full_name, email)', { count: 'exact' });

    if (status && status !== 'ALL') {
      query = query.eq('status', status as any);
    }
    if (category && category !== 'ALL') {
      query = query.eq('category', category as any);
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      query = query.or(`certificate_id.ilike.${term},recipient_name.ilike.${term},course_or_scope_title.ilike.${term},institution_or_company.ilike.${term}`);
    }

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

    const { data, count, error } = await query;
    if (error) {
      console.error('[Admin Certificates API] Query failed:', error.message);
      return sendError(res, 500, 'Failed to fetch certificates.', 'DB_ERROR');
    }

    return sendJson(res, 200, {
      success: true,
      certificates: data,
      totalCount: count || 0,
      page,
      limit,
    });
  }

  // 2. POST: Issue new certificate
  if (req.method === 'POST') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Admins can issue certificates.', 'FORBIDDEN');
    }

    let body: any;
    try {
      body = await parseBody(req);
    } catch {
      return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
    }

    const {
      certificateId,
      category,
      recipientName,
      courseOrScopeTitle,
      institutionOrCompany,
      issueDate,
      expiryDate,
      gradeOrScore,
    } = body;

    if (!certificateId || !category || !recipientName || !courseOrScopeTitle || !issueDate) {
      return sendError(res, 400, 'Missing required fields: certificateId, category, recipientName, courseOrScopeTitle, issueDate.', 'VALIDATION_ERROR');
    }

    // Generate cryptographic SHA-256 verification hash
    const rawPayload = `${certificateId}|${recipientName}|${courseOrScopeTitle}|${issueDate}|HACKUP_SECURITY_V1`;
    const verificationHash = createHash('sha256').update(rawPayload).digest('hex');

    const { data, error } = await supabase
      .from('certificates')
      .insert({
        certificate_id: certificateId.trim().toUpperCase(),
        category: category as CertificateCategory,
        recipient_name: recipientName.trim(),
        course_or_scope_title: courseOrScopeTitle.trim(),
        institution_or_company: institutionOrCompany ? institutionOrCompany.trim() : null,
        issue_date: issueDate,
        expiry_date: expiryDate || null,
        grade_or_score: gradeOrScore ? gradeOrScore.trim() : null,
        verification_hash: verificationHash,
        status: 'ACTIVE',
        created_by: staff.id,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('[Admin Certificates API] Insert failed:', error?.message || error);
      return sendError(res, 500, error?.message || 'Failed to issue certificate.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'CERTIFICATE_ISSUED',
      entityType: 'certificates',
      entityId: data.id,
      details: {
        certificateId: data.certificate_id,
        recipientName: data.recipient_name,
        category: data.category,
      },
      ipAddress: clientIp,
    });

    return sendJson(res, 201, {
      success: true,
      certificate: data,
      message: 'Certificate issued successfully.',
    });
  }

  // 3. PATCH: Update / Revoke certificate
  if (req.method === 'PATCH') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Admins can modify certificate records.', 'FORBIDDEN');
    }

    let body: any;
    try {
      body = await parseBody(req);
    } catch {
      return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
    }

    const { id, status, revocationReason, expiryDate, gradeOrScore } = body;
    if (!id) {
      return sendError(res, 400, 'Certificate ID is required.', 'MISSING_ID');
    }

    const updates: Database['public']['Tables']['certificates']['Update'] = {
      updated_at: new Date().toISOString(),
    };
    if (status) {
      const allowed: CertificateStatus[] = ['ACTIVE', 'REVOKED', 'EXPIRED'];
      if (!allowed.includes(status)) {
        return sendError(res, 400, 'Invalid status.', 'INVALID_STATUS');
      }
      updates.status = status;
    }
    if (revocationReason !== undefined) updates.revocation_reason = revocationReason;
    if (expiryDate !== undefined) updates.expiry_date = expiryDate;
    if (gradeOrScore !== undefined) updates.grade_or_score = gradeOrScore;

    const { data, error } = await supabase
      .from('certificates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('[Admin Certificates API] Update failed:', error?.message || error);
      return sendError(res, 500, error?.message || 'Failed to update certificate.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: updates.status === 'REVOKED' ? 'CERTIFICATE_REVOKED' : 'CERTIFICATE_UPDATED',
      entityType: 'certificates',
      entityId: id,
      details: {
        certificateId: data.certificate_id,
        updatedFields: Object.keys(updates),
        newStatus: data.status,
      },
      ipAddress: clientIp,
    });

    return sendJson(res, 200, {
      success: true,
      certificate: data,
      message: 'Certificate record updated successfully.',
    });
  }

  // 4. DELETE: Super Admin only
  if (req.method === 'DELETE') {
    if (!hasRequiredRole(staff.role, ['SUPER_ADMIN'])) {
      return sendError(res, 403, 'Access denied: Only Super Admins can delete certificates.', 'FORBIDDEN');
    }

    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const id = url.searchParams.get('id');
    if (!id) {
      return sendError(res, 400, 'Certificate ID is required.', 'MISSING_ID');
    }

    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) {
      console.error('[Admin Certificates API] Delete failed:', error.message);
      return sendError(res, 500, 'Failed to delete certificate.', 'DB_ERROR');
    }

    await logAuditEvent({
      adminId: staff.id,
      action: 'CERTIFICATE_DELETED',
      entityType: 'certificates',
      entityId: id,
      ipAddress: clientIp,
    });

    return sendJson(res, 200, {
      success: true,
      message: 'Certificate deleted successfully.',
    });
  }
}
