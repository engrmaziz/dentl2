import { z } from 'zod';

export const createContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-()\u0020]{7,20}$/).optional(),
  service_interest: z.string().max(200).optional(),
  message: z.string().min(10).max(2000),
});
