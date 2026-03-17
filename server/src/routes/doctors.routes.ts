import { Router } from 'express';
import {
  getDoctors, getAllDoctors, getDoctor, createDoctor, updateDoctor, deleteDoctor,
} from '../controllers/doctors.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createDoctorSchema, updateDoctorSchema } from '../validators/doctor.validator';
import { uploadDoctor } from '../middleware/upload.middleware';

const router = Router();

// Public
router.get('/', getDoctors);
router.get('/:id', getDoctor);

// Protected
router.get('/admin/all', authMiddleware, getAllDoctors);
router.post('/', authMiddleware, uploadDoctor.single('photo'), validate(createDoctorSchema), createDoctor);
router.put('/:id', authMiddleware, uploadDoctor.single('photo'), validate(updateDoctorSchema), updateDoctor);
router.delete('/:id', authMiddleware, deleteDoctor);

export default router;
