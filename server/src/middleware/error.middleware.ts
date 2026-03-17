import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { MulterError } from 'multer';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

interface AppError extends Error {
  statusCode?: number;
  code?: string | number;
}

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const isDev = process.env.NODE_ENV !== 'production';

  if (err instanceof ZodError) {
    res.status(422).json({
      error: 'Validation failed',
      details: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
    });
    return;
  }

  if (err instanceof MulterError) {
    const messages: Record<string, string> = {
      LIMIT_FILE_SIZE: 'File too large. Maximum size is 5MB.',
      LIMIT_FILE_COUNT: 'Too many files.',
      LIMIT_UNEXPECTED_FILE: 'Unexpected file field.',
    };
    res.status(400).json({ error: messages[err.code] || err.message });
    return;
  }

  if (err instanceof TokenExpiredError) {
    res.status(401).json({ error: 'Token expired.' });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json({ error: 'Invalid token.' });
    return;
  }

  if (typeof err.code === 'string' && err.code === 'SQLITE_CONSTRAINT') {
    res.status(409).json({ error: 'Duplicate entry or constraint violation.' });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = isDev ? err.message : (statusCode < 500 ? err.message : 'Internal server error');

  if (statusCode >= 500) {
    console.error('[ERROR]', err);
  }

  res.status(statusCode).json({ error: message });
};
