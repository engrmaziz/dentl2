import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import db from '../db/database';
import { Doctor, AuthRequest } from '../types';

export async function getDoctors(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = db.prepare('SELECT * FROM doctors WHERE is_active = 1 ORDER BY id ASC').all() as Doctor[];
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getAllDoctors(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = db.prepare('SELECT * FROM doctors ORDER BY id ASC').all() as Doctor[];
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = db.prepare('SELECT * FROM doctors WHERE id = ?').get(req.params.id) as Doctor | undefined;
    if (!row) { res.status(404).json({ error: 'Doctor not found.' }); return; }
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function createDoctor(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, title, specialization, bio, education, languages, availability } = req.body;

    let photoUrl: string | null = null;
    if (req.file) {
      photoUrl = `/uploads/doctors/${req.file.filename}`;
      await generateThumbnail(req.file.path);
    }

    const result = db.prepare(`
      INSERT INTO doctors (name, title, specialization, bio, education, languages, photo_url, availability)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, title, specialization, bio || null, education || null, languages || null, photoUrl, availability || null);

    const doctor = db.prepare('SELECT * FROM doctors WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
}

export async function updateDoctor(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT * FROM doctors WHERE id = ?').get(req.params.id) as Doctor | undefined;
    if (!existing) { res.status(404).json({ error: 'Doctor not found.' }); return; }

    const { name, title, specialization, bio, education, languages, availability, is_active } = req.body;

    let photoUrl = existing.photo_url;
    if (req.file) {
      if (existing.photo_url) deleteFile(existing.photo_url);
      photoUrl = `/uploads/doctors/${req.file.filename}`;
      await generateThumbnail(req.file.path);
    }

    db.prepare(`
      UPDATE doctors
      SET name = ?, title = ?, specialization = ?, bio = ?, education = ?, languages = ?,
          photo_url = ?, availability = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name ?? existing.name,
      title ?? existing.title,
      specialization ?? existing.specialization,
      bio ?? existing.bio,
      education ?? existing.education,
      languages ?? existing.languages,
      photoUrl,
      availability ?? existing.availability,
      is_active !== undefined ? is_active : existing.is_active,
      req.params.id
    );

    res.json(db.prepare('SELECT * FROM doctors WHERE id = ?').get(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function deleteDoctor(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT * FROM doctors WHERE id = ?').get(req.params.id) as Doctor | undefined;
    if (!existing) { res.status(404).json({ error: 'Doctor not found.' }); return; }

    db.prepare('UPDATE doctors SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(req.params.id);
    res.json({ message: 'Doctor deactivated.' });
  } catch (err) {
    next(err);
  }
}

async function generateThumbnail(filePath: string): Promise<void> {
  try {
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const base = path.basename(filePath, ext);
    const thumbPath = path.join(dir, `${base}_thumb${ext}`);
    await sharp(filePath).resize(300, 300, { fit: 'cover' }).toFile(thumbPath);
  } catch (err) {
    console.error('[DoctorsController] Thumbnail generation failed:', err);
  }
}

function deleteFile(relativeUrl: string): void {
  try {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const filePath = path.join(uploadDir, relativeUrl.replace('/uploads/', ''));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch { /* ignore */ }
}
