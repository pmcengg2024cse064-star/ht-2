import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, parseBody, sendError, sendJson, getClientIp } from '../_lib/response';
import { checkRateLimit } from '../_lib/rateLimiter';
import { verifyTurnstileToken } from '../_lib/turnstile';
import { getSupabaseServerClient } from '../_lib/supabaseServer';
import { notifyNewTrainingRegistration } from '../_lib/email';
import type { TrainingMode } from '../../src/types/database.types';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,25}$/;

function normalizeTrainingMode(input: string): TrainingMode {
  const lower = (input || '').toLowerCase();
  if (lower.includes('online') || lower.includes('live')) {
    return 'LIVE_ONLINE';
  }
  if (lower.includes('hybrid')) {
    return 'HYBRID';
  }
  if (lower.includes('campus') || lower.includes('workshop')) {
    return 'CAMPUS_WORKSHOP';
  }
  return 'COIMBATORE_LAB';
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['POST'])) return;

  const clientIp = getClientIp(req);

  // 1. Rate Limiting (10 requests per minute per IP, Fail-Closed)
  const rateLimitKey = `tr_reg:${clientIp}`;
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
    expectedAction: 'training_registration',
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
  const candidateName = typeof body.candidateName === 'string' ? body.candidateName.trim() : '';
  const whatsappNumber = typeof body.whatsappNumber === 'string' ? body.whatsappNumber.trim() : '';
  const programTitle = typeof body.programTitle === 'string' ? body.programTitle.trim() : '';
  const preferredMode = normalizeTrainingMode(typeof body.preferredMode === 'string' ? body.preferredMode : '');

  if (!candidateName || candidateName.length < 2 || candidateName.length > 100) {
    return sendError(res, 400, 'Please provide a valid full name (2 to 100 characters).', 'VALIDATION_ERROR');
  }

  if (!whatsappNumber || !PHONE_REGEX.test(whatsappNumber)) {
    return sendError(res, 400, 'Please provide a valid WhatsApp phone number.', 'VALIDATION_ERROR');
  }

  if (!programTitle || programTitle.length > 150) {
    return sendError(res, 400, 'Please select or provide a valid training track.', 'VALIDATION_ERROR');
  }

  // Optional fields
  let email: string | null = null;
  if (typeof body.email === 'string' && body.email.trim() !== '') {
    const trimmedEmail = body.email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 150) {
      return sendError(res, 400, 'Please provide a valid email address.', 'VALIDATION_ERROR');
    }
    email = trimmedEmail;
  }

  const collegeOrCompany = typeof body.collegeOrCompany === 'string'
    ? body.collegeOrCompany.trim().slice(0, 150)
    : null;

  // 5. Database Insertion using Privileged Server Client
  try {
    const supabase = getSupabaseServerClient();

    // Verify program published state if programId provided
    if (body.programId) {
      const { data: prog } = await supabase
        .from('training_programs')
        .select('is_published')
        .eq('id', body.programId)
        .single();
      if (prog && !prog.is_published) {
        return sendError(res, 400, 'Selected training program is currently not open for registration.', 'PROGRAM_UNPUBLISHED');
      }
    }

    // Verify batch is open and active if batchId provided
    if (body.batchId) {
      const { data: batch } = await supabase
        .from('training_batches')
        .select('*')
        .eq('id', body.batchId)
        .single();
      if (batch && (!batch.is_active || (batch as any).status === 'CLOSED')) {
        return sendError(res, 400, 'Selected training batch is closed or no longer active.', 'BATCH_CLOSED');
      }
    }

    const { data, error } = await supabase
      .from('training_registrations')
      .insert({
        candidate_name: candidateName,
        whatsapp_number: whatsappNumber,
        email,
        college_or_company: collegeOrCompany,
        program_title: programTitle,
        preferred_mode: preferredMode,
        status: 'NEW',
        assigned_to: null,
        internal_notes: null,
        ip_address: clientIp,
      })
      .select('registration_code, created_at')
      .single();

    if (error || !data) {
      console.error('[Training Registration API] Database insert failed:', error?.message || error);
      return sendError(res, 500, 'Failed to reserve your training seat. Please try again.', 'DB_ERROR');
    }

    // 6. Asynchronous Email Alert Dispatch
    notifyNewTrainingRegistration({
      registration_code: data.registration_code,
      candidate_name: candidateName,
      whatsapp_number: whatsappNumber,
      email,
      college_or_company: collegeOrCompany,
      program_title: programTitle,
      preferred_mode: preferredMode,
    }).catch((emailErr) => {
      console.error('[Training Registration API] Email notification failed silently:', emailErr);
    });

    // 7. Sanitized Public Response
    return sendJson(res, 201, {
      success: true,
      trackingCode: data.registration_code,
      message: 'Demo pass and syllabus reservation confirmed.',
      createdAt: data.created_at,
    });
  } catch (err: any) {
    console.error('[Training Registration API] Unhandled error:', err?.message || err);
    return sendError(res, 500, 'An unexpected server error occurred while processing your registration.', 'SERVER_ERROR');
  }
}
