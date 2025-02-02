import { z } from 'zod';

export const confirmationTokenSchema = z.object({
  email: z.string().email('Email inválido'),
});
export type ConfirmationTokenPayload = z.infer<typeof confirmationTokenSchema>;
