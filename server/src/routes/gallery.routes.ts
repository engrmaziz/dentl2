import { Router } from 'express';
import {
  getImages, getFeatured, getCategories, uploadImage, updateImage, deleteImage,
} from '../controllers/gallery.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { uploadGallery } from '../middleware/upload.middleware';

const router = Router();

// Public
router.get('/', getImages);
router.get('/featured', getFeatured);
router.get('/categories', getCategories);

// Protected
router.post('/', authMiddleware, uploadGallery.single('image'), uploadImage);
router.patch('/:id', authMiddleware, updateImage);
router.delete('/:id', authMiddleware, deleteImage);

export default router;
