import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import db from '../db/database';
import { BlogPost, AuthRequest, PaginationQuery } from '../types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function estimateReadTime(content: string): number {
  // Prepend space before each '<' to prevent word merging when tag is removed,
  // then strip all HTML tags (including unclosed ones), then count words.
  const text = content
    .replace(/</g, ' <')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { page = '1', limit = '10', category, status = 'published' } = req.query as PaginationQuery & {
      category?: string; status?: string;
    };
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let where = 'WHERE 1=1';
    const params: unknown[] = [];

    if (status !== 'all') { where += ' AND status = ?'; params.push(status); }
    if (category) { where += ' AND category = ?'; params.push(category); }

    const total = (db.prepare(`SELECT COUNT(*) as count FROM blog_posts ${where}`).get(...params) as { count: number }).count;

    const rows = db.prepare(`
      SELECT id, title, slug, excerpt, category, tags, featured_image_url, status,
             read_time, view_count, published_at, created_at, updated_at, author_id
      FROM blog_posts ${where}
      ORDER BY published_at DESC, created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit, 10), offset) as BlogPost[];

    res.json({ data: rows, total, page: parseInt(page, 10), limit: parseInt(limit, 10) });
  } catch (err) {
    next(err);
  }
}

export async function getPostBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const post = db.prepare("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'").get(req.params.slug) as BlogPost | undefined;
    if (!post) { res.status(404).json({ error: 'Post not found.' }); return; }

    db.prepare('UPDATE blog_posts SET view_count = view_count + 1 WHERE id = ?').run(post.id);
    res.json({ ...post, view_count: post.view_count + 1 });
  } catch (err) {
    next(err);
  }
}

export async function getPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const post = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id) as BlogPost | undefined;
    if (!post) { res.status(404).json({ error: 'Post not found.' }); return; }
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function createPost(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, content, category, excerpt, tags, status } = req.body;

    let slug = slugify(title);
    // Ensure uniqueness by appending a suffix if needed
    let suffix = 1;
    const baseSlug = slug;
    while (db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(slug)) {
      slug = `${baseSlug}-${suffix++}`;
    }

    const readTime = estimateReadTime(content);
    const publishedAt = status === 'published' ? new Date().toISOString() : null;

    let featuredImageUrl: string | null = null;
    if (req.file) {
      featuredImageUrl = `/uploads/blog/${req.file.filename}`;
    }

    const result = db.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, author_id, category, tags, featured_image_url, status, read_time, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, excerpt || null, content, req.user?.id || null, category, tags || null, featuredImageUrl, status || 'draft', readTime, publishedAt);

    res.status(201).json(db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(result.lastInsertRowid));
  } catch (err) {
    next(err);
  }
}

export async function updatePost(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id) as BlogPost | undefined;
    if (!existing) { res.status(404).json({ error: 'Post not found.' }); return; }

    const { title, content, category, excerpt, tags, status } = req.body;

    const newTitle = title ?? existing.title;
    const newContent = content ?? existing.content;
    const newStatus = status ?? existing.status;
    const readTime = content ? estimateReadTime(newContent) : existing.read_time;

    let publishedAt = existing.published_at;
    if (newStatus === 'published' && existing.status === 'draft') {
      publishedAt = new Date().toISOString();
    }

    let featuredImageUrl = existing.featured_image_url;
    if (req.file) {
      if (existing.featured_image_url) deleteFile(existing.featured_image_url);
      featuredImageUrl = `/uploads/blog/${req.file.filename}`;
    }

    db.prepare(`
      UPDATE blog_posts
      SET title = ?, content = ?, category = ?, excerpt = ?, tags = ?,
          featured_image_url = ?, status = ?, read_time = ?, published_at = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      newTitle,
      newContent,
      category ?? existing.category,
      excerpt ?? existing.excerpt,
      tags ?? existing.tags,
      featuredImageUrl,
      newStatus,
      readTime,
      publishedAt,
      req.params.id
    );

    res.json(db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function deletePost(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const existing = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id) as BlogPost | undefined;
    if (!existing) { res.status(404).json({ error: 'Post not found.' }); return; }

    if (existing.featured_image_url) deleteFile(existing.featured_image_url);
    db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
    res.json({ message: 'Post deleted.' });
  } catch (err) {
    next(err);
  }
}

export async function getCategories(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rows = db.prepare("SELECT DISTINCT category FROM blog_posts WHERE status = 'published' ORDER BY category ASC").all() as Array<{ category: string }>;
    res.json(rows.map(r => r.category));
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
