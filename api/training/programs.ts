import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, sendError, sendJson, getClientIp } from '../_lib/response.js';
import { checkRateLimit } from '../_lib/rateLimiter.js';
import { getSupabaseServerClient } from '../_lib/supabaseServer.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET'])) return;

  const clientIp = getClientIp(req);

  // Rate Limiting (60 requests per minute)
  const rateLimitResult = await checkRateLimit(`pub_prog:${clientIp}`, 60, 60);
  if (!rateLimitResult.success) {
    return sendError(res, 429, 'Rate limit exceeded.', 'RATE_LIMIT_EXCEEDED');
  }

  try {
    const supabase = getSupabaseServerClient();

    // Fetch only published programs
    const { data: programs, error: progError } = await supabase
      .from('training_programs')
      .select('id, slug, title, category, duration, level, display_order')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (progError) {
      console.error('[Public Programs API] Query failed:', progError.message);
      return sendError(res, 500, 'Failed to retrieve training programs.', 'DB_ERROR');
    }

    // Fetch active batches for published programs
    const { data: batches, error: batchError } = await supabase
      .from('training_batches')
      .select('id, program_id, batch_name, start_date, mode, seats_available')
      .eq('is_active', true)
      .order('start_date', { ascending: true });

    if (batchError) {
      console.error('[Public Batches API] Query failed:', batchError.message);
      return sendError(res, 500, 'Failed to retrieve training batches.', 'DB_ERROR');
    }

    // Attach active batches to programs
    const programsWithBatches = (programs || []).map((p) => ({
      ...p,
      batches: (batches || []).filter((b) => b.program_id === p.id),
    }));

    return sendJson(res, 200, {
      success: true,
      data: programsWithBatches,
    });
  } catch (err: any) {
    console.error('[Public Programs API] Error:', err?.message || err);
    return sendError(res, 500, 'Server error retrieving training catalogue.', 'SERVER_ERROR');
  }
}
