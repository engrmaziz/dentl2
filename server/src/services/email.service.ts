import nodemailer, { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

const GOLD = '#C8A96E';
const DARK = '#1A1A2E';
const IVORY = '#FDFAF5';

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Smile Dental Clinic</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F0E8;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${IVORY};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:${DARK};padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:${GOLD};font-size:28px;font-weight:normal;letter-spacing:3px;text-transform:uppercase;">Smile Dental Clinic</h1>
              <p style="margin:8px 0 0;color:#9A8B72;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Where Art Meets Dentistry</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:${DARK};padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#9A8B72;font-size:12px;line-height:1.6;">
                100 Harley Street, London W1G 7JA<br/>
                <a href="tel:+442079460958" style="color:${GOLD};text-decoration:none;">+44 (0)20 7946 0958</a> &nbsp;|&nbsp;
                <a href="mailto:hello@smileclinic.com" style="color:${GOLD};text-decoration:none;">hello@smileclinic.com</a>
              </p>
              <p style="margin:12px 0 0;color:#6B6B6B;font-size:11px;">
                &copy; ${new Date().getFullYear()} Smile Dental Clinic. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function goldDivider(): string {
  return `<hr style="border:none;border-top:1px solid ${GOLD};margin:24px 0;opacity:0.4;" />`;
}

function infoRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:#6B5F4F;font-size:13px;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:${DARK};font-size:14px;font-weight:bold;vertical-align:top;">${value}</td>
  </tr>`;
}

// ── Template 1: Appointment confirmation to patient ──────────────────────────
export async function sendAppointmentConfirmation(data: {
  patientName: string;
  patientEmail: string;
  service: string;
  doctorName: string;
  date: string;
  time: string;
  notes?: string;
  icsAttachment?: Buffer;
}): Promise<void> {
  const content = `
    <h2 style="color:${DARK};font-size:22px;margin:0 0 8px;">Appointment Confirmed ✓</h2>
    <p style="color:#6B5F4F;margin:0 0 24px;font-size:15px;">Dear ${data.patientName}, your appointment has been successfully booked.</p>
    ${goldDivider()}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Service', data.service)}
      ${infoRow('Doctor', data.doctorName)}
      ${infoRow('Date', data.date)}
      ${infoRow('Time', data.time)}
      ${data.notes ? infoRow('Notes', data.notes) : ''}
    </table>
    ${goldDivider()}
    <p style="color:#6B5F4F;font-size:14px;line-height:1.7;margin:0 0 16px;">
      Please arrive 10 minutes before your appointment. If you need to reschedule or cancel, 
      kindly let us know at least 24 hours in advance.
    </p>
    <p style="color:#6B5F4F;font-size:14px;margin:0;">
      We look forward to welcoming you to Smile Dental Clinic.
    </p>
    <div style="margin-top:28px;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" 
         style="display:inline-block;background-color:${GOLD};color:${DARK};padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px;">
        Visit Our Website
      </a>
    </div>
  `;

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"Smile Dental Clinic" <${process.env.SMTP_USER}>`,
    to: data.patientEmail,
    subject: `Appointment Confirmed – ${data.date} at ${data.time}`,
    html: baseTemplate(content),
  };

  if (data.icsAttachment) {
    mailOptions.attachments = [{
      filename: 'appointment.ics',
      content: data.icsAttachment,
      contentType: 'text/calendar',
    }];
  }

  await getTransporter().sendMail(mailOptions);
}

// ── Template 2: Appointment reminder ─────────────────────────────────────────
export async function sendAppointmentReminder(data: {
  patientName: string;
  patientEmail: string;
  service: string;
  doctorName: string;
  date: string;
  time: string;
}): Promise<void> {
  const content = `
    <h2 style="color:${DARK};font-size:22px;margin:0 0 8px;">Appointment Reminder</h2>
    <p style="color:#6B5F4F;margin:0 0 24px;font-size:15px;">Dear ${data.patientName}, this is a friendly reminder of your upcoming appointment.</p>
    ${goldDivider()}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Service', data.service)}
      ${infoRow('Doctor', data.doctorName)}
      ${infoRow('Date', data.date)}
      ${infoRow('Time', data.time)}
    </table>
    ${goldDivider()}
    <p style="color:#6B5F4F;font-size:14px;line-height:1.7;margin:0;">
      Please remember to arrive 10 minutes early. If you need to reschedule, 
      please contact us as soon as possible on <strong style="color:${DARK};">+44 (0)20 7946 0958</strong>.
    </p>
  `;

  await getTransporter().sendMail({
    from: `"Smile Dental Clinic" <${process.env.SMTP_USER}>`,
    to: data.patientEmail,
    subject: `Reminder: Your appointment tomorrow at ${data.time}`,
    html: baseTemplate(content),
  });
}

// ── Template 3: New appointment notification to admin ─────────────────────────
export async function sendAdminNewAppointment(data: {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  service: string;
  doctorName: string;
  date: string;
  time: string;
  notes?: string;
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;

  const content = `
    <h2 style="color:${DARK};font-size:22px;margin:0 0 8px;">New Appointment Booked</h2>
    <p style="color:#6B5F4F;margin:0 0 24px;font-size:15px;">A new appointment has been submitted through the website.</p>
    ${goldDivider()}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Patient', data.patientName)}
      ${infoRow('Email', data.patientEmail)}
      ${infoRow('Phone', data.patientPhone)}
      ${infoRow('Service', data.service)}
      ${infoRow('Doctor', data.doctorName)}
      ${infoRow('Date', data.date)}
      ${infoRow('Time', data.time)}
      ${data.notes ? infoRow('Notes', data.notes) : ''}
    </table>
    ${goldDivider()}
    <div style="margin-top:20px;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/appointments" 
         style="display:inline-block;background-color:${GOLD};color:${DARK};padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px;">
        View in Dashboard
      </a>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"Smile Dental Clinic" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Appointment: ${data.patientName} – ${data.date} at ${data.time}`,
    html: baseTemplate(content),
  });
}

// ── Template 4: Contact form notification to admin ────────────────────────────
export async function sendAdminContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;

  const content = `
    <h2 style="color:${DARK};font-size:22px;margin:0 0 8px;">New Contact Enquiry</h2>
    <p style="color:#6B5F4F;margin:0 0 24px;font-size:15px;">A new enquiry has been received via the website contact form.</p>
    ${goldDivider()}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Name', data.name)}
      ${infoRow('Email', data.email)}
      ${data.phone ? infoRow('Phone', data.phone) : ''}
      ${data.serviceInterest ? infoRow('Service Interest', data.serviceInterest) : ''}
    </table>
    <div style="margin:20px 0;padding:16px;background-color:#F5F0E8;border-left:3px solid ${GOLD};border-radius:4px;">
      <p style="margin:0;color:${DARK};font-size:14px;line-height:1.7;">${data.message}</p>
    </div>
    ${goldDivider()}
    <div style="margin-top:20px;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/contacts" 
         style="display:inline-block;background-color:${GOLD};color:${DARK};padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px;">
        View in Dashboard
      </a>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"Smile Dental Clinic" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Enquiry from ${data.name}`,
    html: baseTemplate(content),
  });
}

// ── Template 5: Auto-reply to contact form submission ─────────────────────────
export async function sendContactAutoReply(data: {
  name: string;
  email: string;
}): Promise<void> {
  const content = `
    <h2 style="color:${DARK};font-size:22px;margin:0 0 8px;">Thank You for Getting in Touch</h2>
    <p style="color:#6B5F4F;margin:0 0 16px;font-size:15px;">Dear ${data.name},</p>
    <p style="color:#6B5F4F;font-size:14px;line-height:1.8;margin:0 0 16px;">
      We have received your enquiry and a member of our team will be in touch with you shortly, 
      usually within one business day.
    </p>
    <p style="color:#6B5F4F;font-size:14px;line-height:1.8;margin:0 0 24px;">
      If your matter is urgent, please do not hesitate to call us directly on 
      <strong style="color:${DARK};">+44 (0)20 7946 0958</strong> during clinic hours.
    </p>
    ${goldDivider()}
    <p style="color:#6B5F4F;font-size:14px;margin:0;">
      Warm regards,<br/>
      <strong style="color:${DARK};">The Smile Dental Clinic Team</strong>
    </p>
  `;

  await getTransporter().sendMail({
    from: `"Smile Dental Clinic" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: 'We have received your enquiry – Smile Dental Clinic',
    html: baseTemplate(content),
  });
}
