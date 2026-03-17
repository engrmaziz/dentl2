import { Request, Response, NextFunction } from 'express';
import db from '../db/database';
import { Appointment, AppointmentWithDoctor, AuthRequest, PaginationQuery } from '../types';
import { sendAppointmentConfirmation, sendAdminNewAppointment } from '../services/email.service';
import { generateIcsBuffer } from '../services/ical.service';

export async function getAppointments(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { page = '1', limit = '20', status, date, doctor_id } = req.query as PaginationQuery & {
      status?: string; date?: string; doctor_id?: string;
    };
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let where = "WHERE a.status != 'deleted'";
    const params: unknown[] = [];

    if (status) { where += ' AND a.status = ?'; params.push(status); }
    if (date) { where += ' AND a.appointment_date = ?'; params.push(date); }
    if (doctor_id) { where += ' AND a.doctor_id = ?'; params.push(doctor_id); }

    const total = (db.prepare(`SELECT COUNT(*) as count FROM appointments a ${where}`).get(...params) as { count: number }).count;

    const rows = db.prepare(`
      SELECT a.*, d.name as doctor_name
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.id
      ${where}
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
      LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit, 10), offset) as AppointmentWithDoctor[];

    res.json({ data: rows, total, page: parseInt(page, 10), limit: parseInt(limit, 10) });
  } catch (err) {
    next(err);
  }
}

export async function getAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = db.prepare(`
      SELECT a.*, d.name as doctor_name
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.id
      WHERE a.id = ? AND a.status != 'deleted'
    `).get(req.params.id) as AppointmentWithDoctor | undefined;

    if (!row) { res.status(404).json({ error: 'Appointment not found.' }); return; }
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { patient_name, patient_email, patient_phone, service, doctor_id, appointment_date, appointment_time, notes } = req.body;

    const result = db.prepare(`
      INSERT INTO appointments (patient_name, patient_email, patient_phone, service, doctor_id, appointment_date, appointment_time, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(patient_name, patient_email, patient_phone, service, doctor_id || null, appointment_date, appointment_time, notes || null);

    const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(result.lastInsertRowid) as Appointment;

    let doctorName = 'Our dental team';
    if (doctor_id) {
      const doc = db.prepare('SELECT name FROM doctors WHERE id = ?').get(doctor_id) as { name: string } | undefined;
      if (doc) doctorName = doc.name;
    }

    // Try to send emails and generate ICS (non-blocking)
    try {
      const parsedDate = new Date(appointment_date);
      const dateFormatted = `${parsedDate.getDate().toString().padStart(2, '0')} ${parsedDate.toLocaleString('en-GB', { month: 'long' })} ${parsedDate.getFullYear()}`;

      const startDt = new Date(`${appointment_date}T${appointment_time}:00`);
      const endDt = new Date(startDt.getTime() + 60 * 60 * 1000);

      const icsBuffer = generateIcsBuffer({
        summary: `Dental Appointment – ${service}`,
        description: `Your appointment for ${service} with ${doctorName}.`,
        startDateTime: startDt,
        endDateTime: endDt,
        organizerName: 'Smile Dental Clinic',
        organizerEmail: process.env.SMTP_USER || 'hello@smileclinic.com',
        attendeeEmail: patient_email,
        attendeeName: patient_name,
      });

      await Promise.all([
        sendAppointmentConfirmation({
          patientName: patient_name,
          patientEmail: patient_email,
          service,
          doctorName,
          date: dateFormatted,
          time: appointment_time,
          notes,
          icsAttachment: icsBuffer,
        }),
        sendAdminNewAppointment({
          patientName: patient_name,
          patientEmail: patient_email,
          patientPhone: patient_phone,
          service,
          doctorName,
          date: dateFormatted,
          time: appointment_time,
          notes,
        }),
      ]);
    } catch (emailErr) {
      console.error('[Appointments] Email send failed:', emailErr);
    }

    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
}

export async function updateAppointment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare("SELECT * FROM appointments WHERE id = ? AND status != 'deleted'").get(req.params.id);
    if (!existing) { res.status(404).json({ error: 'Appointment not found.' }); return; }

    const { status, notes } = req.body;
    db.prepare(`
      UPDATE appointments SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(status, notes ?? null, req.params.id);

    const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteAppointment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare("SELECT id FROM appointments WHERE id = ? AND status != 'deleted'").get(req.params.id);
    if (!existing) { res.status(404).json({ error: 'Appointment not found.' }); return; }

    db.prepare("UPDATE appointments SET status = 'deleted', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(req.params.id);
    res.json({ message: 'Appointment deleted.' });
  } catch (err) {
    next(err);
  }
}

export async function getTodayAppointments(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const rows = db.prepare(`
      SELECT a.*, d.name as doctor_name
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.id
      WHERE a.appointment_date = ? AND a.status != 'deleted'
      ORDER BY a.appointment_time ASC
    `).all(today) as AppointmentWithDoctor[];
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const thisMonthStart = new Date(); thisMonthStart.setDate(1);
    const monthStr = thisMonthStart.toISOString().split('T')[0];

    const total = (db.prepare("SELECT COUNT(*) as c FROM appointments WHERE status != 'deleted'").get() as { c: number }).c;
    const todayCount = (db.prepare("SELECT COUNT(*) as c FROM appointments WHERE appointment_date = ? AND status != 'deleted'").get(today) as { c: number }).c;
    const pending = (db.prepare("SELECT COUNT(*) as c FROM appointments WHERE status = 'pending'").get() as { c: number }).c;
    const confirmed = (db.prepare("SELECT COUNT(*) as c FROM appointments WHERE status = 'confirmed'").get() as { c: number }).c;
    const thisMonth = (db.prepare("SELECT COUNT(*) as c FROM appointments WHERE appointment_date >= ? AND status != 'deleted'").get(monthStr) as { c: number }).c;

    res.json({ total, today: todayCount, pending, confirmed, this_month: thisMonth });
  } catch (err) {
    next(err);
  }
}
