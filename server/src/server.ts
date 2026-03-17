import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

import { apiLimiter } from './middleware/rateLimit.middleware';
import { errorMiddleware } from './middleware/error.middleware';

import authRoutes from './routes/auth.routes';
import appointmentRoutes from './routes/appointments.routes';
import doctorRoutes from './routes/doctors.routes';
import blogRoutes from './routes/blog.routes';
import galleryRoutes from './routes/gallery.routes';
import contactRoutes from './routes/contact.routes';
import settingsRoutes from './routes/settings.routes';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ── Security middleware ────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── General middleware ────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── CSRF protection for cookie-based auth ────────────────────────────────────
// For state-changing requests that rely on cookies, verify Origin matches the
// allowed frontend. Requests using the Authorization: Bearer header are exempt
// because a cross-origin attacker cannot set custom headers.
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
app.use((req: Request, res: Response, next: NextFunction): void => {
  if (SAFE_METHODS.has(req.method)) { next(); return; }
  // Bearer token requests are inherently CSRF-safe
  if (req.headers.authorization?.startsWith('Bearer ')) { next(); return; }
  // Cookie-based requests must come from the allowed origin
  const origin = req.headers.origin;
  if (origin && origin !== FRONTEND_URL) {
    res.status(403).json({ error: 'Forbidden: invalid request origin.' });
    return;
  }
  next();
});

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use('/api', apiLimiter);

// ── Static file serving ───────────────────────────────────────────────────────
const uploadDir = process.env.UPLOAD_DIR || './uploads';
app.use('/uploads', express.static(path.resolve(uploadDir)));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use(errorMiddleware);

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🦷 Smile Dental Clinic API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
