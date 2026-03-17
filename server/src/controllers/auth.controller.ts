import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/database';
import { AdminUser, AuthRequest } from '../types';

function signToken(user: AdminUser): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    secret,
    { expiresIn: '7d' }
  );
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email) as AdminUser | undefined;
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    db.prepare('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);

    const token = signToken(user);

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }
    const user = db.prepare('SELECT id, email, name, role, created_at, last_login FROM admin_users WHERE id = ?').get(req.user.id);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }
    const { current_password, new_password } = req.body as { current_password: string; new_password: string };
    if (!current_password || !new_password) {
      res.status(400).json({ error: 'current_password and new_password are required.' });
      return;
    }
    if (new_password.length < 8) {
      res.status(400).json({ error: 'New password must be at least 8 characters.' });
      return;
    }

    const user = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(req.user.id) as AdminUser | undefined;
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    const match = await bcrypt.compare(current_password, user.password_hash);
    if (!match) {
      res.status(401).json({ error: 'Current password is incorrect.' });
      return;
    }

    const hash = await bcrypt.hash(new_password, 12);
    db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').run(hash, user.id);

    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    next(err);
  }
}
