import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(100),
  category: z.string().min(2).max(100),
  excerpt: z.string().max(500).optional(),
  tags: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
});

export const updateBlogSchema = createBlogSchema.partial();
