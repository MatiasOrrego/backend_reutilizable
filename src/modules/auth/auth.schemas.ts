import { z } from 'zod';

export const AuthRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const AuthLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AuthRegisterInput = z.infer<typeof AuthRegisterSchema>;
export type AuthLoginInput = z.infer<typeof AuthLoginSchema>;
