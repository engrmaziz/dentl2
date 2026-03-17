import { Router } from 'express';
import {
  getSettings, getSetting, upsertSetting, bulkUpsertSettings, deleteSetting,
} from '../controllers/settings.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public (read-only)
router.get('/', getSettings);
router.get('/:key', getSetting);

// Protected
router.put('/', authMiddleware, bulkUpsertSettings);
router.put('/:key', authMiddleware, upsertSetting);
router.delete('/:key', authMiddleware, deleteSetting);

export default router;
