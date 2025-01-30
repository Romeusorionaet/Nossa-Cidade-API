import { z } from 'zod';

export const tokenPayloadSchema = z.object({
  sub: z.string().uuid('Não autorizado'),
  publicId: z.string().uuid('Não autorizado'),
  staffId: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  permissions: z.string().array(),
});
export type UserPayload = z.infer<typeof tokenPayloadSchema>;

export const confirmationTokenSchema = z.object({
  email: z.string().email('Email inválido'),
});
export type ConfirmationTokenPayload = z.infer<typeof confirmationTokenSchema>;
