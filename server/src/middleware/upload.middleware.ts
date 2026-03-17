import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Request } from 'express';

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

const ensureDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createStorage = (subfolder: string) =>
  multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb) => {
      const dir = path.join(UPLOAD_DIR, subfolder);
      ensureDir(dir);
      cb(null, dir);
    },
    filename: (_req: Request, file: Express.Multer.File, cb) => {
      const random = crypto.randomBytes(8).toString('hex');
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${random}${ext}`);
    },
  });

const imageFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type '${file.mimetype}' is not allowed. Accepted types: jpeg, png, webp, gif`));
  }
};

export const uploadDoctor = multer({
  storage: createStorage('doctors'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadBlog = multer({
  storage: createStorage('blog'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadGallery = multer({
  storage: createStorage('gallery'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
