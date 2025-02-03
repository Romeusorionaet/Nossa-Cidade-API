import { z } from 'zod';

export const forgotPasswordTokenSchema = z.object({
  email: z.string().email('Endereço inválido'),
});
export type ForgotPasswordTokenPayload = z.infer<
  typeof forgotPasswordTokenSchema
>;
