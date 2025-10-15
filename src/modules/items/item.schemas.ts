import { z } from 'zod';

export const ItemCreateSchema = z.object({
  title: z.string().min(2),
  content: z.string().optional(),
  status: z.enum(['OPEN','DONE']).optional(),
});

export const ItemUpdateSchema = ItemCreateSchema.partial();

export type ItemCreateInput = z.infer<typeof ItemCreateSchema>;
export type ItemUpdateInput = z.infer<typeof ItemUpdateSchema>;
