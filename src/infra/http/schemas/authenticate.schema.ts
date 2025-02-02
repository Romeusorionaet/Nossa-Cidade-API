import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

export const authenticateSchema = z.object({
  email: z.string().email('Precisa ser um email válido'),
  password: z.string().min(6, { message: 'No mínimo 6 digitos' }),
});

export const authenticateSchemaValidationPipe = new ZodValidationPipe(
  authenticateSchema,
);

export type AuthenticationRequest = z.infer<typeof authenticateSchema>;
