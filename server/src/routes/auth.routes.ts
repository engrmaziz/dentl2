import { Router } from 'express';
import { login, getMe, changePassword } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

router.post('/login', authLimiter, login);
router.get('/me', authMiddleware, getMe);
router.post('/change-password', authMiddleware, changePassword);

export default router;
