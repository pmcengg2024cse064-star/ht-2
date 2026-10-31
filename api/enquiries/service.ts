import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, parseBody, sendError, sendJson, getClientIp } from '../_lib/response.js';
import { checkRateLimit } from '../_lib/rateLimiter.js';
import { verifyTurnstileToken } from '../_lib/turnstile.js';
import { getSupabaseServerClient } from '../_lib/supabaseServer.js';
import { notifyNewServiceEnquiry } from '../_lib/email.js';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,25}$/;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['POST'])) return;

  const clientIp = getClientIp(req);

  // 1. Rate Limiting (10 requests per minute per IP, Fail-Closed)
  const rateLimitKey = `srv_enq:${clientIp}`;
  const rateLimitResult = await checkRateLimit(rateLimitKey, 10, 60, { failClosed: true });
  if (!rateLimitResult.success) {
    if (rateLimitResult.isServiceUnavailable) {
      return sendError(
        res,
        503,
        'Security verification service temporarily unavailable. Please retry shortly.',
        'SERVICE_UNAVAILABLE'
      );
    }
    return sendError(
      res,
      429,
      'Rate limit exceeded. Please wait a moment before submitting again.',
      'RATE_LIMIT_EXCEEDED'
    );
  }

  // 2. Parse Request Body
  let body: any;
  try {
    body = await parseBody(req);
  } catch (err: any) {
    return sendError(res, err.statusCode || 400, err.message, 'INVALID_PAYLOAD');
  }

  // 3. Cloudflare Turnstile Verification
  const turnstileResult = await verifyTurnstileToken(body.turnstileToken, {
    remoteIp: clientIp,
    expectedAction: 'service_enquiry',
  });
  if (!turnstileResult.success) {
    return sendError(
      res,
      403,
      'Anti-bot security verification failed. Please refresh and try again.',
      'TURNSTILE_FAILED'
    );
  }

  // 4. Strict Field Validation
  const contactName = typeof body.contactName === 'string' ? body.contactName.trim() : '';
  const workEmail = typeof body.workEmail === 'string' ? body.workEmail.trim().toLowerCase() : '';
  const phoneNumber = typeof body.phoneNumber === 'string' ? body.phoneNumber.trim() : '';
  const serviceInterest = typeof body.serviceInterest === 'string' ? body.serviceInterest.trim() : '';
  const sourcePage = typeof body.sourcePage === 'string' ? body.sourcePage.trim() : 'website_form';

  if (!contactName || contactName.length < 2 || contactName.length > 100) {
    return sendError(res, 400, 'Please provide a valid full name (2 to 100 characters).', 'VALIDATION_ERROR');
  }

  if (!workEmail || !EMAIL_REGEX.test(workEmail) || workEmail.length > 150) {
    return sendError(res, 400, 'Please provide a valid corporate email address.', 'VALIDATION_ERROR');
  }

  if (!phoneNumber || !PHONE_REGEX.test(phoneNumber)) {
    return sendError(res, 400, 'Please provide a valid phone number with country code.', 'VALIDATION_ERROR');
  }

  if (!serviceInterest || serviceInterest.length > 200) {
    return sendError(res, 400, 'Please select or provide a valid service interest.', 'VALIDATION_ERROR');
  }

  // Optional fields with bounds
  const companyName = typeof body.companyName === 'string' ? body.companyName.trim().slice(0, 150) : null;
  const complianceGoal = typeof body.complianceGoal === 'string' ? body.complianceGoal.trim().slice(0, 300) : null;
  const targetScope = typeof body.targetScope === 'string' ? body.targetScope.trim().slice(0, 500) : null;
  const testingWindow = typeof body.testingWindow === 'string' ? body.testingWindow.trim().slice(0, 100) : null;
  const requiresNDA = typeof body.requiresNDA === 'boolean' ? body.requiresNDA : true;
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 3000) : null;

  // 5. Database Insertion using Privileged Server Client
  // Strips any client-supplied internal notes, assigned_to, or status.
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('service_enquiries')
      .insert({
        contact_name: contactName,
        work_email: workEmail,
        phone_number: phoneNumber,
        service_interest: serviceInterest,
        source_page: sourcePage,
        company_name: companyName,
        compliance_goal: complianceGoal,
        target_scope: targetScope,
        testing_window: testingWindow,
        requires_nda: requiresNDA,
        message,
        status: 'NEW',
        assigned_to: null,
        internal_notes: null,
        ip_address: clientIp,
      })
      .select('enquiry_code, created_at')
      .single();

    if (error || !data) {
      console.error('[Service Enquiry API] Database insert failed:', error?.message || error);
      return sendError(res, 500, 'Failed to store enquiry in the secure database. Please try again.', 'DB_ERROR');
    }

    // 6. Asynchronous Email Alert Dispatch
    notifyNewServiceEnquiry({
      enquiry_code: data.enquiry_code,
      company_name: companyName,
      contact_name: contactName,
      work_email: workEmail,
      phone_number: phoneNumber,
      service_interest: serviceInterest,
      target_scope: targetScope,
      testing_window: testingWindow,
      message,
      source_page: sourcePage,
    }).catch((emailErr) => {
      console.error('[Service Enquiry API] Email notification failed silently:', emailErr);
    });

    // 7. Sanitized Public Response
    return sendJson(res, 201, {
      success: true,
      trackingCode: data.enquiry_code,
      message: 'Your cybersecurity consultation request has been securely registered.',
      createdAt: data.created_at,
    });
  } catch (err: any) {
    console.error('[Service Enquiry API] Unhandled error:', err?.message || err);
    return sendError(res, 500, 'An unexpected server error occurred while processing your request.', 'SERVER_ERROR');
  }
}
