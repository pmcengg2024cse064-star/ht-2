import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, sendError, sendJson } from '../_lib/response';
import { authenticateStaffRequest } from '../_lib/auth';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    return sendError(res, authResult.status, authResult.error, 'UNAUTHORIZED');
  }

  return sendJson(res, 200, {
    success: true,
    staff: authResult.auth.profile,
  });
}
