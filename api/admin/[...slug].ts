import type { IncomingMessage, ServerResponse } from 'node:http';
import { handlePreflight, sendError } from '../_lib/response';
import auditLogsHandler from '../_admin/audit-logs';
import batchesHandler from '../_admin/batches';
import certificatesImportHandler from '../_admin/certificates-import';
import certificatesHandler from '../_admin/certificates';
import enquiriesHandler from '../_admin/enquiries';
import exportHandler from '../_admin/export';
import meHandler from '../_admin/me';
import programsHandler from '../_admin/programs';
import registrationsHandler from '../_admin/registrations';

/**
 * Consolidated Administrative Serverless Function for Vercel Hobby Plan.
 * Routes all `/api/admin/*` endpoints through a single Serverless Function,
 * keeping the total function count well under Vercel's Hobby limit of 12.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handlePreflight(req, res)) return;

  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/\/$/, '');
  const segments = pathname.split('/').filter(Boolean);
  const adminIndex = segments.indexOf('admin');
  const subroute = adminIndex !== -1 && segments.length > adminIndex + 1 ? segments[adminIndex + 1] : '';

  switch (subroute) {
    case 'enquiries':
      return enquiriesHandler(req, res);
    case 'registrations':
      return registrationsHandler(req, res);
    case 'certificates':
      return certificatesHandler(req, res);
    case 'certificates-import':
      return certificatesImportHandler(req, res);
    case 'programs':
      return programsHandler(req, res);
    case 'batches':
      return batchesHandler(req, res);
    case 'audit-logs':
      return auditLogsHandler(req, res);
    case 'export':
      return exportHandler(req, res);
    case 'me':
      return meHandler(req, res);
    default:
      return sendError(res, 404, `Admin endpoint '${pathname}' not found.`, 'NOT_FOUND');
  }
}
