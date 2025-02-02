import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

export const updatePasswordSchema = z.object({
  email: z.string().email('Precisa ser um email válido'),
  oldPassword: z.string().min(6, { message: 'No mínimo 6 digitos' }),
  newPassword: z.string().min(6, { message: 'No mínimo 6 digitos' }),
});

export const updatePasswordSchemaValidationPipe = new ZodValidationPipe(
  updatePasswordSchema,
);

export type UpdatePasswordRequest = z.infer<typeof updatePasswordSchema>;
