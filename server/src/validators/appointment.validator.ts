import { z } from 'zod';

export const createAppointmentSchema = z.object({
  patient_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  patient_email: z.string().email('Invalid email address'),
  patient_phone: z.string().regex(/^\+?[\d\s\-()\u0020]{7,20}$/, 'Invalid phone number'),
  service: z.string().min(1, 'Service is required').max(200),
  doctor_id: z.coerce.number().int().positive().optional().nullable(),
  appointment_date: z.string().refine((date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    // Compare date-only (strip time component) so today is still bookable
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  }, 'Appointment date must be today or in the future'),
  appointment_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
  notes: z.string().max(1000).optional(),
});

export const updateAppointmentSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
  notes: z.string().max(1000).optional(),
});
