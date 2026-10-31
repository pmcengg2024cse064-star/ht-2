import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, sendError, setCorsHeaders, getClientIp } from '../_lib/response.js';
import { authenticateStaffRequest, hasRequiredRole, type AuthContext } from '../_lib/auth.js';
import { getSupabaseServerClient } from '../_lib/supabaseServer.js';
import { generateExcelWorkbook, ColumnDefinition } from '../_lib/excel.js';
import { logAuditEvent } from '../_lib/audit.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    const failure = authResult as { success: false; status: number; error: string };
    return sendError(res, failure.status, failure.error, 'UNAUTHORIZED');
  }

  const staff = (authResult as { success: true; auth: AuthContext }).auth.profile;
  const clientIp = getClientIp(req);
  const supabase = getSupabaseServerClient();

  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const type = url.searchParams.get('type') || 'service_enquiries';

  try {
    let workbookBuffer: Buffer;
    let filename = '';
    const dateStamp = new Date().toISOString().slice(0, 10);

    // 1. Export: Service Enquiries
    if (type === 'service_enquiries') {
      if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'])) {
        return sendError(res, 403, 'Access denied: Instructors cannot export service enquiries.', 'FORBIDDEN');
      }

      const { data, error } = await supabase
        .from('service_enquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5000);

      if (error) throw error;

      const columns: ColumnDefinition[] = [
        { header: 'Enquiry Code', key: 'enquiry_code', width: 22 },
        { header: 'Created Date', key: 'created_at', width: 22 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'Company Name', key: 'company_name', width: 26 },
        { header: 'Contact Name', key: 'contact_name', width: 24 },
        { header: 'Work Email', key: 'work_email', width: 28 },
        { header: 'Phone Number', key: 'phone_number', width: 20 },
        { header: 'Service Interest', key: 'service_interest', width: 30 },
        { header: 'Target Scope', key: 'target_scope', width: 35 },
        { header: 'Compliance Goal', key: 'compliance_goal', width: 25 },
        { header: 'Testing Window', key: 'testing_window', width: 20 },
        { header: 'Requires NDA', key: 'requires_nda', width: 15 },
        { header: 'Source Page', key: 'source_page', width: 18 },
        { header: 'Internal Notes', key: 'internal_notes', width: 35 },
      ];

      workbookBuffer = await generateExcelWorkbook({
        sheetName: 'Service Enquiries',
        columns,
        rows: data || [],
      });
      filename = `hackup_service_enquiries_${dateStamp}.xlsx`;
    } 
    // 2. Export: Training Registrations
    else if (type === 'training_registrations') {
      if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN', 'AUDITOR'])) {
        return sendError(res, 403, 'Access denied: Instructors cannot export training registrations.', 'FORBIDDEN');
      }

      const { data, error } = await supabase
        .from('training_registrations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5000);

      if (error) throw error;

      const columns: ColumnDefinition[] = [
        { header: 'Registration Code', key: 'registration_code', width: 22 },
        { header: 'Date', key: 'created_at', width: 22 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'Candidate Name', key: 'candidate_name', width: 26 },
        { header: 'WhatsApp Number', key: 'whatsapp_number', width: 22 },
        { header: 'Email', key: 'email', width: 28 },
        { header: 'College / Company', key: 'college_or_company', width: 30 },
        { header: 'Program Title', key: 'program_title', width: 35 },
        { header: 'Preferred Mode', key: 'preferred_mode', width: 22 },
        { header: 'Internal Notes', key: 'internal_notes', width: 35 },
      ];

      workbookBuffer = await generateExcelWorkbook({
        sheetName: 'Training Registrations',
        columns,
        rows: data || [],
      });
      filename = `hackup_training_registrations_${dateStamp}.xlsx`;
    } 
    // 3. Export: Certificates Repository
    else if (type === 'certificates') {
      if (!hasRequiredRole(staff.role, ['SUPER_ADMIN', 'ADMIN'])) {
        return sendError(res, 403, 'Access denied: Only Super Admins and Admins can export the certificate registry.', 'FORBIDDEN');
      }

      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('issue_date', { ascending: false })
        .limit(5000);

      if (error) throw error;

      const columns: ColumnDefinition[] = [
        { header: 'Certificate ID', key: 'certificate_id', width: 24 },
        { header: 'Status', key: 'status', width: 14 },
        { header: 'Category', key: 'category', width: 26 },
        { header: 'Recipient Name', key: 'recipient_name', width: 26 },
        { header: 'Course / Scope Title', key: 'course_or_scope_title', width: 35 },
        { header: 'Institution / Company', key: 'institution_or_company', width: 30 },
        { header: 'Issue Date', key: 'issue_date', width: 16 },
        { header: 'Expiry Date', key: 'expiry_date', width: 16 },
        { header: 'Grade / Score', key: 'grade_or_score', width: 16 },
        { header: 'Verification Hash (SHA-256)', key: 'verification_hash', width: 35 },
        { header: 'Revocation Reason', key: 'revocation_reason', width: 30 },
      ];

      workbookBuffer = await generateExcelWorkbook({
        sheetName: 'Certificates',
        columns,
        rows: data || [],
      });
      filename = `hackup_certificates_${dateStamp}.xlsx`;
    } else {
      return sendError(res, 400, 'Invalid export type. Choose service_enquiries, training_registrations, or certificates.', 'INVALID_TYPE');
    }

    // Log the export action to audit trail
    await logAuditEvent({
      adminId: staff.id,
      action: 'EXPORT_EXCEL',
      entityType: type,
      details: { exportType: type, filename },
      ipAddress: clientIp,
    });

    setCorsHeaders(res);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', workbookBuffer.length);
    res.end(workbookBuffer);
  } catch (err: any) {
    console.error('[Admin Export API] Export failure:', err?.message || err);
    return sendError(res, 500, 'Failed to generate Excel export file.', 'EXPORT_FAILED');
  }
}
