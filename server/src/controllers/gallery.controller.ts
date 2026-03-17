import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import db from '../db/database';
import { GalleryImage, AuthRequest } from '../types';

export async function getImages(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category } = req.query as { category?: string };
    let query = 'SELECT * FROM gallery_images';
    const params: unknown[] = [];
    if (category) { query += ' WHERE category = ?'; params.push(category); }
    query += ' ORDER BY sort_order ASC, id ASC';
    res.json(db.prepare(query).all(...params));
  } catch (err) {
    next(err);
  }
}

export async function getFeatured(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = db.prepare('SELECT * FROM gallery_images WHERE is_featured = 1 ORDER BY sort_order ASC').all();
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getCategories(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = db.prepare('SELECT DISTINCT category FROM gallery_images ORDER BY category ASC').all() as Array<{ category: string }>;
    res.json(rows.map(r => r.category));
  } catch (err) {
    next(err);
  }
}

export async function uploadImage(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.file) { res.status(400).json({ error: 'No image file provided.' }); return; }

    const { category, caption, alt_text, sort_order, is_featured } = req.body;
    if (!category) { res.status(400).json({ error: 'Category is required.' }); return; }

    const url = `/uploads/gallery/${req.file.filename}`;
    let thumbnailUrl: string | null = null;

    try {
      const ext = path.extname(req.file.filename);
      const base = path.basename(req.file.filename, ext);
      const thumbFilename = `${base}_thumb${ext}`;
      const thumbPath = path.join(path.dirname(req.file.path), thumbFilename);
      await sharp(req.file.path).resize(400, 300, { fit: 'cover' }).toFile(thumbPath);
      thumbnailUrl = `/uploads/gallery/${thumbFilename}`;
    } catch (sharpErr) {
      console.error('[Gallery] Thumbnail generation failed:', sharpErr);
    }

    const result = db.prepare(`
      INSERT INTO gallery_images (url, thumbnail_url, category, caption, alt_text, sort_order, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(url, thumbnailUrl, category, caption || null, alt_text || null, sort_order || 0, is_featured ? 1 : 0);

    res.status(201).json(db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(result.lastInsertRowid));
  } catch (err) {
    next(err);
  }
}

export async function updateImage(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(req.params.id) as GalleryImage | undefined;
    if (!existing) { res.status(404).json({ error: 'Image not found.' }); return; }

    const { caption, alt_text, sort_order, is_featured, category } = req.body;
    db.prepare(`
      UPDATE gallery_images
      SET caption = ?, alt_text = ?, sort_order = ?, is_featured = ?, category = ?
      WHERE id = ?
    `).run(
      caption ?? existing.caption,
      alt_text ?? existing.alt_text,
      sort_order !== undefined ? sort_order : existing.sort_order,
      is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
      category ?? existing.category,
      req.params.id
    );

    res.json(db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function deleteImage(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(req.params.id) as GalleryImage | undefined;
    if (!existing) { res.status(404).json({ error: 'Image not found.' }); return; }

    deleteFile(existing.url);
    if (existing.thumbnail_url) deleteFile(existing.thumbnail_url);
    db.prepare('DELETE FROM gallery_images WHERE id = ?').run(req.params.id);
    res.json({ message: 'Image deleted.' });
  } catch (err) {
    next(err);
  }
}

function deleteFile(relativeUrl: string): void {
  try {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const filePath = path.join(uploadDir, relativeUrl.replace('/uploads/', ''));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch { /* ignore */ }
}
