import { z } from 'zod';

export const createDoctorSchema = z.object({
  name: z.string().min(2).max(100),
  title: z.string().min(2).max(100),
  specialization: z.string().min(2).max(200),
  bio: z.string().max(2000).optional(),
  education: z.string().optional(),
  languages: z.string().optional(),
  availability: z.string().optional(),
});

export const updateDoctorSchema = createDoctorSchema.partial();
