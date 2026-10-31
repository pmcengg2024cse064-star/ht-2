import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkMethod, handlePreflight, sendError, sendJson } from '../_lib/response.js';
import { authenticateStaffRequest, type AuthContext } from '../_lib/auth.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  if (!checkMethod(req, res, ['GET'])) return;

  const authResult = await authenticateStaffRequest(req.headers.authorization);
  if (!authResult.success) {
    const failure = authResult as { success: false; status: number; error: string };
    return sendError(res, failure.status, failure.error, 'UNAUTHORIZED');
  }

  const staff = (authResult as { success: true; auth: AuthContext }).auth.profile;
  return sendJson(res, 200, {
    success: true,
    staff,
  });
}
