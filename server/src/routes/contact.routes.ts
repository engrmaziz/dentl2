import { Router } from 'express';
import {
  getSubmissions, getSubmission, createSubmission, updateSubmission, deleteSubmission, getStats,
} from '../controllers/contact.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createContactSchema } from '../validators/contact.validator';
import { contactLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

// Public
router.post('/', contactLimiter, validate(createContactSchema), createSubmission);

// Protected
router.get('/', authMiddleware, getSubmissions);
router.get('/stats', authMiddleware, getStats);
router.get('/:id', authMiddleware, getSubmission);
router.patch('/:id', authMiddleware, updateSubmission);
router.delete('/:id', authMiddleware, deleteSubmission);

export default router;
