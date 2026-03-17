import { Router } from 'express';
import {
  getPosts, getPostBySlug, getPost, createPost, updatePost, deletePost, getCategories,
} from '../controllers/blog.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createBlogSchema, updateBlogSchema } from '../validators/blog.validator';
import { uploadBlog } from '../middleware/upload.middleware';

const router = Router();

// Public
router.get('/', getPosts);
router.get('/categories', getCategories);
router.get('/slug/:slug', getPostBySlug);

// Protected
router.get('/:id', authMiddleware, getPost);
router.post('/', authMiddleware, uploadBlog.single('featured_image'), validate(createBlogSchema), createPost);
router.put('/:id', authMiddleware, uploadBlog.single('featured_image'), validate(updateBlogSchema), updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
