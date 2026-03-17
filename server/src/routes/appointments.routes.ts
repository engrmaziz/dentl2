import { Router } from 'express';
import {
  getAppointments, getAppointment, createAppointment,
  updateAppointment, deleteAppointment, getTodayAppointments, getStats,
} from '../controllers/appointments.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createAppointmentSchema, updateAppointmentSchema } from '../validators/appointment.validator';

const router = Router();

// Public
router.post('/', validate(createAppointmentSchema), createAppointment);

// Protected
router.get('/', authMiddleware, getAppointments);
router.get('/stats', authMiddleware, getStats);
router.get('/today', authMiddleware, getTodayAppointments);
router.get('/:id', authMiddleware, getAppointment);
router.patch('/:id', authMiddleware, validate(updateAppointmentSchema), updateAppointment);
router.delete('/:id', authMiddleware, deleteAppointment);

export default router;
