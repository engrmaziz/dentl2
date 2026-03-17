import { Request, Response, NextFunction } from 'express';
import db from '../db/database';
import { ContactSubmission, AuthRequest, PaginationQuery } from '../types';
import { sendAdminContactNotification, sendContactAutoReply } from '../services/email.service';

export async function getSubmissions(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { page = '1', limit = '20', is_read, is_starred } = req.query as PaginationQuery & {
      is_read?: string; is_starred?: string;
    };
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let where = 'WHERE 1=1';
    const params: unknown[] = [];
    if (is_read !== undefined) { where += ' AND is_read = ?'; params.push(is_read === 'true' ? 1 : 0); }
    if (is_starred !== undefined) { where += ' AND is_starred = ?'; params.push(is_starred === 'true' ? 1 : 0); }

    const total = (db.prepare(`SELECT COUNT(*) as count FROM contact_submissions ${where}`).get(...params) as { count: number }).count;

    const rows = db.prepare(`
      SELECT * FROM contact_submissions ${where}
      ORDER BY submitted_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit, 10), offset) as ContactSubmission[];

    res.json({ data: rows, total, page: parseInt(page, 10), limit: parseInt(limit, 10) });
  } catch (err) {
    next(err);
  }
}

export async function getSubmission(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = db.prepare('SELECT * FROM contact_submissions WHERE id = ?').get(req.params.id) as ContactSubmission | undefined;
    if (!row) { res.status(404).json({ error: 'Submission not found.' }); return; }

    if (!row.is_read) {
      db.prepare('UPDATE contact_submissions SET is_read = 1 WHERE id = ?').run(req.params.id);
    }

    res.json({ ...row, is_read: 1 });
  } catch (err) {
    next(err);
  }
}

export async function createSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, phone, service_interest, message } = req.body;
    const ip = req.ip || req.socket?.remoteAddress || null;

    const result = db.prepare(`
      INSERT INTO contact_submissions (name, email, phone, service_interest, message, ip_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, email, phone || null, service_interest || null, message, ip);

    try {
      await Promise.all([
        sendAdminContactNotification({ name, email, phone, serviceInterest: service_interest, message }),
        sendContactAutoReply({ name, email }),
      ]);
    } catch (emailErr) {
      console.error('[Contact] Email send failed:', emailErr);
    }

    res.status(201).json({
      id: result.lastInsertRowid,
      message: 'Your enquiry has been received. We will be in touch shortly.',
    });
  } catch (err) {
    next(err);
  }
}

export async function updateSubmission(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT * FROM contact_submissions WHERE id = ?').get(req.params.id);
    if (!existing) { res.status(404).json({ error: 'Submission not found.' }); return; }

    const { is_read, is_starred } = req.body;
    db.prepare(`
      UPDATE contact_submissions SET is_read = ?, is_starred = ? WHERE id = ?
    `).run(
      is_read !== undefined ? (is_read ? 1 : 0) : (existing as ContactSubmission).is_read,
      is_starred !== undefined ? (is_starred ? 1 : 0) : (existing as ContactSubmission).is_starred,
      req.params.id
    );

    res.json(db.prepare('SELECT * FROM contact_submissions WHERE id = ?').get(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function deleteSubmission(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT id FROM contact_submissions WHERE id = ?').get(req.params.id);
    if (!existing) { res.status(404).json({ error: 'Submission not found.' }); return; }

    db.prepare('DELETE FROM contact_submissions WHERE id = ?').run(req.params.id);
    res.json({ message: 'Submission deleted.' });
  } catch (err) {
    next(err);
  }
}

export async function getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const total = (db.prepare('SELECT COUNT(*) as c FROM contact_submissions').get() as { c: number }).c;
    const unread = (db.prepare('SELECT COUNT(*) as c FROM contact_submissions WHERE is_read = 0').get() as { c: number }).c;
    const starred = (db.prepare('SELECT COUNT(*) as c FROM contact_submissions WHERE is_starred = 1').get() as { c: number }).c;
    res.json({ total, unread, starred });
  } catch (err) {
    next(err);
  }
}
