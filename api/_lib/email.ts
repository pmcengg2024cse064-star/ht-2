import { getServerEnv } from './env.js';

/**
 * Escapes HTML characters to prevent HTML injection in notification emails.
 */
function escapeHtml(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends a transactional email using the Resend REST API.
 * Gracefully handles missing credentials without failing the underlying business operation.
 */
export async function sendEmailNotification({
  subject,
  html,
  text,
}: {
  subject: string;
  html: string;
  text: string;
}): Promise<{ success: boolean; error?: string }> {
  const env = getServerEnv();

  if (!env.RESEND_API_KEY || env.RESEND_API_KEY.trim() === '' || env.RESEND_API_KEY.includes('placeholder')) {
    console.info('[Email Service] Resend API key not configured. Skipping email dispatch.');
    return { success: false, error: 'Resend API key not configured' };
  }

  const recipients = env.NOTIFICATION_RECIPIENT_EMAILS && env.NOTIFICATION_RECIPIENT_EMAILS.length > 0
    ? env.NOTIFICATION_RECIPIENT_EMAILS
    : ['info@hackuptechnology.com'];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM || 'Hackup Alerts <notifications@hackuptechnology.com>',
        to: recipients,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Email Service] Resend API error (${res.status}):`, errText);
      return { success: false, error: `Resend HTTP ${res.status}` };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Email Service] Failed to send email via Resend:', err?.message || err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * Dispatches notification for a new B2B Service Enquiry.
 */
export async function notifyNewServiceEnquiry(enquiry: {
  enquiry_code: string;
  company_name?: string | null;
  contact_name: string;
  work_email: string;
  phone_number: string;
  service_interest: string;
  target_scope?: string | null;
  testing_window?: string | null;
  message?: string | null;
  source_page: string;
}): Promise<void> {
  const subject = `[New B2B Enquiry] ${enquiry.enquiry_code} - ${enquiry.company_name || enquiry.contact_name}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #881337; padding: 20px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px;">New B2B Cyber Security Enquiry</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #fecdd3;">Reference: ${escapeHtml(enquiry.enquiry_code)}</p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Company:</td><td>${escapeHtml(enquiry.company_name || 'N/A')}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Contact Name:</td><td>${escapeHtml(enquiry.contact_name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Work Email:</td><td><a href="mailto:${escapeHtml(enquiry.work_email)}">${escapeHtml(enquiry.work_email)}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${escapeHtml(enquiry.phone_number)}">${escapeHtml(enquiry.phone_number)}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Service Interest:</td><td>${escapeHtml(enquiry.service_interest)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Target Scope:</td><td>${escapeHtml(enquiry.target_scope || 'Standard Assessment')}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Testing Window:</td><td>${escapeHtml(enquiry.testing_window || 'Not specified')}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Source Page:</td><td>${escapeHtml(enquiry.source_page)}</td></tr>
        </table>
        ${enquiry.message ? `<div style="margin-top: 16px; padding: 12px; background-color: #f8fafc; border-radius: 6px; font-size: 13px;"><strong>Message:</strong><br/>${escapeHtml(enquiry.message)}</div>` : ''}
      </div>
      <div style="background-color: #f1f5f9; padding: 12px 24px; font-size: 12px; color: #64748b;">
        Hackup Technology Pvt Ltd — Automated Advisory Dispatch System
      </div>
    </div>
  `;

  const text = `
New B2B Cyber Security Enquiry:
Reference: ${enquiry.enquiry_code}
Company: ${enquiry.company_name || 'N/A'}
Contact: ${enquiry.contact_name}
Email: ${enquiry.work_email}
Phone: ${enquiry.phone_number}
Service: ${enquiry.service_interest}
Scope: ${enquiry.target_scope || 'N/A'}
Window: ${enquiry.testing_window || 'N/A'}
Source: ${enquiry.source_page}
Notes: ${enquiry.message || 'None'}
  `.trim();

  await sendEmailNotification({ subject, html, text });
}

/**
 * Dispatches notification for a new Training Demo Registration.
 */
export async function notifyNewTrainingRegistration(reg: {
  registration_code: string;
  candidate_name: string;
  whatsapp_number: string;
  email?: string | null;
  college_or_company?: string | null;
  program_title: string;
  preferred_mode: string;
}): Promise<void> {
  const subject = `[New Training Demo] ${reg.registration_code} - ${reg.candidate_name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #881337; padding: 20px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px;">New Cyber Training Demo Registration</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #fecdd3;">Reference: ${escapeHtml(reg.registration_code)}</p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Candidate Name:</td><td>${escapeHtml(reg.candidate_name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">WhatsApp Number:</td><td><a href="https://wa.me/${escapeHtml(reg.whatsapp_number.replace(/\D/g, ''))}">${escapeHtml(reg.whatsapp_number)}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${escapeHtml(reg.email || 'N/A')}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">College / Company:</td><td>${escapeHtml(reg.college_or_company || 'N/A')}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Program Title:</td><td>${escapeHtml(reg.program_title)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Preferred Mode:</td><td>${escapeHtml(reg.preferred_mode)}</td></tr>
        </table>
      </div>
      <div style="background-color: #f1f5f9; padding: 12px 24px; font-size: 12px; color: #64748b;">
        Hackup Technology Academy — Automated Student Coordination
      </div>
    </div>
  `;

  const text = `
New Training Demo Registration:
Reference: ${reg.registration_code}
Candidate: ${reg.candidate_name}
WhatsApp: ${reg.whatsapp_number}
Email: ${reg.email || 'N/A'}
College/Company: ${reg.college_or_company || 'N/A'}
Program: ${reg.program_title}
Mode: ${reg.preferred_mode}
  `.trim();

  await sendEmailNotification({ subject, html, text });
}
