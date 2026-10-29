import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, parseBody, sendError, sendJson, getClientIp } from '../_lib/response';
import { checkRateLimit } from '../_lib/rateLimiter';
import { getSupabaseServerClient } from '../_lib/supabaseServer';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET', 'POST'])) return;

  const clientIp = getClientIp(req);

  // Rate Limiting (30 certificate verifications per minute per IP to mitigate scraping)
  const rateLimitResult = await checkRateLimit(`cert_vrf:${clientIp}`, 30, 60);
  if (!rateLimitResult.success) {
    return sendError(res, 429, 'Too many verification attempts. Please wait a minute.', 'RATE_LIMIT_EXCEEDED');
  }

  let certId = '';
  if (req.method === 'GET') {
    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    certId = url.searchParams.get('id') || '';
  } else {
    try {
      const body = await parseBody(req);
      certId = typeof body.id === 'string' ? body.id : (typeof body.certificateId === 'string' ? body.certificateId : '');
    } catch {
      return sendError(res, 400, 'Invalid request body.', 'INVALID_PAYLOAD');
    }
  }

  certId = certId.trim();
  if (!certId || certId.length < 3 || certId.length > 60) {
    return sendError(res, 400, 'Please provide a valid certificate identifier (3 to 60 characters).', 'VALIDATION_ERROR');
  }

  try {
    const supabase = getSupabaseServerClient();

    // Call the approved SECURITY DEFINER public verification RPC
    const { data, error } = await supabase.rpc('verify_certificate_public', {
      p_certificate_id: certId,
    });

    if (error) {
      console.error('[Certificate Verification API] RPC error:', error.message);
      // Fallback query matching the exact sanitized columns if RPC isn't deployed yet
      const { data: fallbackData } = await supabase
        .from('certificates')
        .select('certificate_id, category, recipient_name, course_or_scope_title, institution_or_company, issue_date, expiry_date, status, verification_hash')
        .ilike('certificate_id', certId)
        .limit(1)
        .maybeSingle();

      if (!fallbackData) {
        return sendJson(res, 200, {
          success: true,
          found: false,
          message: 'Certificate not found. Please verify the identifier and try again.',
        });
      }

      return sendJson(res, 200, {
        success: true,
        found: true,
        certificate: fallbackData,
      });
    }

    const certRecord = Array.isArray(data) ? data[0] : data;

    if (!certRecord) {
      return sendJson(res, 200, {
        success: true,
        found: false,
        message: 'No active or archived certificate matches the supplied identifier.',
      });
    }

    return sendJson(res, 200, {
      success: true,
      found: true,
      certificate: {
        certificateId: certRecord.certificate_id,
        category: certRecord.category,
        recipientName: certRecord.recipient_name,
        courseOrScopeTitle: certRecord.course_or_scope_title,
        institutionOrCompany: certRecord.institution_or_company,
        issueDate: certRecord.issue_date,
        expiryDate: certRecord.expiry_date,
        status: certRecord.status,
        verificationHash: certRecord.verification_hash,
      },
    });
  } catch (err: any) {
    console.error('[Certificate Verification API] Unexpected error:', err?.message || err);
    return sendError(res, 500, 'Internal verification service error.', 'SERVER_ERROR');
  }
}
