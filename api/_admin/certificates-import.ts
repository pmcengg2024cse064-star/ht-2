import type { IncomingMessage, ServerResponse } from 'node:http';
import { createHash } from 'node:crypto';
import { checkMethod, handlePreflight, parseBody, sendError, sendJson, getClientIp } from '../_lib/response';
import { authenticateStaffRequest, hasRequiredRole } from '../_lib/auth';
import { getSupabaseServerClient } from '../_lib/supabaseServer';
import { logAuditEvent } from '../_lib/audit';
import type { CertificateCategory } from '../../src/types/database.types';

const ALLOWED_CATEGORIES: CertificateCategory[] = [
  'STUDENT_TRAINING',
  'INDUSTRIAL_INTERNSHIP',
  'SAFE_TO_HOST_VAPT',
  'FACULTY_DEVELOPMENT',
];

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

interface ImportRow {
  certificateId: string;
  category: string;
  recipientName: string;
  courseOrScopeTitle: string;
  institutionOrCompany?: string;
  issueDate: string;
  expiryDate?: string;
  gradeOrScore?: string;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['POST'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    return sendError(res, authResult.status, authResult.error, 'UNAUTHORIZED');
  }

  const staff = authResult.auth.profile;
  if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
    return sendError(res, 403, 'Access denied: Only Admins can import certificates.', 'FORBIDDEN');
  }

  const clientIp = getClientIp(req);
  const supabase = getSupabaseServerClient();

  let body: any;
  try {
    body = await parseBody(req);
  } catch {
    return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
  }

  const records: ImportRow[] = Array.isArray(body.records) ? body.records : [];
  const dryRun: boolean = Boolean(body.dryRun);

  if (records.length === 0) {
    return sendError(res, 400, 'No certificate records supplied for import.', 'EMPTY_IMPORT');
  }

  if (records.length > 500) {
    return sendError(res, 400, 'Batch limit exceeded: Maximum 500 records per import transaction.', 'BATCH_TOO_LARGE');
  }

  const errors: { row: number; certificateId?: string; error: string }[] = [];
  const seenIdsInBatch = new Set<string>();
  const validatedRows: any[] = [];

  // 1. Validation loop
  for (let i = 0; i < records.length; i++) {
    const row = records[i];
    const rowNum = i + 1;
    const certId = typeof row.certificateId === 'string' ? row.certificateId.trim().toUpperCase() : '';

    if (!certId || certId.length < 3 || certId.length > 60) {
      errors.push({ row: rowNum, certificateId: certId, error: 'Invalid Certificate ID format (must be 3-60 chars).' });
      continue;
    }

    if (seenIdsInBatch.has(certId)) {
      errors.push({ row: rowNum, certificateId: certId, error: `Duplicate Certificate ID found within import batch: ${certId}` });
      continue;
    }
    seenIdsInBatch.add(certId);

    const category = typeof row.category === 'string' ? row.category.trim().toUpperCase() : '';
    if (!ALLOWED_CATEGORIES.includes(category as CertificateCategory)) {
      errors.push({ row: rowNum, certificateId: certId, error: `Invalid category: ${category}. Allowed: ${ALLOWED_CATEGORIES.join(', ')}` });
      continue;
    }

    const recipientName = typeof row.recipientName === 'string' ? row.recipientName.trim() : '';
    if (!recipientName || recipientName.length < 2 || recipientName.length > 100) {
      errors.push({ row: rowNum, certificateId: certId, error: 'Recipient name must be between 2 and 100 characters.' });
      continue;
    }

    const courseOrScopeTitle = typeof row.courseOrScopeTitle === 'string' ? row.courseOrScopeTitle.trim() : '';
    if (!courseOrScopeTitle || courseOrScopeTitle.length < 2 || courseOrScopeTitle.length > 150) {
      errors.push({ row: rowNum, certificateId: certId, error: 'Course or Scope title must be between 2 and 150 characters.' });
      continue;
    }

    const issueDate = typeof row.issueDate === 'string' ? row.issueDate.trim() : '';
    if (!issueDate || !DATE_REGEX.test(issueDate) || isNaN(Date.parse(issueDate))) {
      errors.push({ row: rowNum, certificateId: certId, error: 'Issue date must be a valid YYYY-MM-DD date.' });
      continue;
    }

    let expiryDate: string | null = null;
    if (typeof row.expiryDate === 'string' && row.expiryDate.trim() !== '') {
      expiryDate = row.expiryDate.trim();
      if (!DATE_REGEX.test(expiryDate) || isNaN(Date.parse(expiryDate))) {
        errors.push({ row: rowNum, certificateId: certId, error: 'Expiry date must be a valid YYYY-MM-DD date.' });
        continue;
      }
    }

    const rawPayload = `${certId}|${recipientName}|${courseOrScopeTitle}|${issueDate}|HACKUP_SECURITY_V1`;
    const verificationHash = createHash('sha256').update(rawPayload).digest('hex');

    validatedRows.push({
      certificate_id: certId,
      category,
      recipient_name: recipientName,
      course_or_scope_title: courseOrScopeTitle,
      institution_or_company: row.institutionOrCompany ? row.institutionOrCompany.trim() : null,
      issue_date: issueDate,
      expiry_date: expiryDate,
      grade_or_score: row.gradeOrScore ? row.gradeOrScore.trim() : null,
      verification_hash: verificationHash,
      status: 'ACTIVE',
      created_by: staff.id,
    });
  }

  // 2. Check for collisions against existing database records
  if (validatedRows.length > 0) {
    const idsToCheck = validatedRows.map((r) => r.certificate_id);
    const { data: existingCollisions } = await supabase
      .from('certificates')
      .select('certificate_id')
      .in('certificate_id', idsToCheck);

    if (existingCollisions && existingCollisions.length > 0) {
      for (const col of existingCollisions) {
        errors.push({
          row: 0,
          certificateId: col.certificate_id,
          error: `Certificate ID already exists in the production database: ${col.certificate_id}`,
        });
      }
    }
  }

  // Return dry-run validation preview or stop on errors
  if (dryRun || errors.length > 0) {
    return sendJson(res, 200, {
      success: errors.length === 0,
      dryRun: true,
      totalRows: records.length,
      validCount: validatedRows.length - (errors.filter((e) => e.row === 0).length),
      errorCount: errors.length,
      errors,
      message: errors.length > 0
        ? `Validation identified ${errors.length} issue(s). Resolve before committing.`
        : 'All records validated successfully. Ready for commit.',
    });
  }

  // 3. Commit batch insert
  const { data: inserted, error: insertError } = await supabase
    .from('certificates')
    .insert(validatedRows)
    .select('id, certificate_id');

  if (insertError) {
    console.error('[Certificates Import API] Insert error:', insertError.message);
    return sendError(res, 500, `Database import failed: ${insertError.message}`, 'DB_ERROR');
  }

  // Log audit trail
  await logAuditEvent({
    adminId: staff.id,
    action: 'HISTORICAL_CERTIFICATES_IMPORTED',
    entityType: 'certificates',
    details: {
      importedCount: inserted?.length || 0,
      batchSize: records.length,
    },
    ipAddress: clientIp,
  });

  return sendJson(res, 201, {
    success: true,
    dryRun: false,
    importedCount: inserted?.length || 0,
    message: `Successfully imported ${inserted?.length || 0} certificates into the repository.`,
  });
}
