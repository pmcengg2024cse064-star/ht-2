import type { IncomingMessage, ServerResponse } from 'node:http';
import { handlePreflight, sendError } from './_lib/response';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;
  return sendError(
    res,
    404,
    `API endpoint '${req.url || ''}' not found on Hackup Serverless Backend.`,
    'NOT_FOUND'
  );
}
