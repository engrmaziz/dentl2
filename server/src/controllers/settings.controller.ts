import { Request, Response, NextFunction } from 'express';
import db from '../db/database';
import { ClinicSetting, AuthRequest } from '../types';

export async function getSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = db.prepare('SELECT * FROM clinic_settings ORDER BY key ASC').all() as ClinicSetting[];
    const settings: Record<string, string> = {};
    rows.forEach(r => { settings[r.key] = r.value; });
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

export async function getSetting(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = db.prepare('SELECT * FROM clinic_settings WHERE key = ?').get(req.params.key) as ClinicSetting | undefined;
    if (!row) { res.status(404).json({ error: 'Setting not found.' }); return; }
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function upsertSetting(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (value === undefined || value === null) {
      res.status(400).json({ error: 'value is required.' });
      return;
    }

    db.prepare(`
      INSERT INTO clinic_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `).run(key, String(value));

    res.json(db.prepare('SELECT * FROM clinic_settings WHERE key = ?').get(key));
  } catch (err) {
    next(err);
  }
}

export async function bulkUpsertSettings(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const settings = req.body as Record<string, string>;
    if (!settings || typeof settings !== 'object') {
      res.status(400).json({ error: 'Body must be a key-value object.' });
      return;
    }

    const upsert = db.prepare(`
      INSERT INTO clinic_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `);

    const run = db.transaction(() => {
      for (const [k, v] of Object.entries(settings)) {
        upsert.run(k, String(v));
      }
    });
    run();

    res.json({ message: `${Object.keys(settings).length} settings updated.` });
  } catch (err) {
    next(err);
  }
}

export async function deleteSetting(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT key FROM clinic_settings WHERE key = ?').get(req.params.key);
    if (!existing) { res.status(404).json({ error: 'Setting not found.' }); return; }

    db.prepare('DELETE FROM clinic_settings WHERE key = ?').run(req.params.key);
    res.json({ message: 'Setting deleted.' });
  } catch (err) {
    next(err);
  }
}
