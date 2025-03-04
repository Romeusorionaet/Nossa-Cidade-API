import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const resendConfirmationEmailSchema = z.object({
  email: z.string().email('Precisa ser um email válido'),
});

export const resendConfirmationEmailSchemaValidationPipe =
  new ZodValidationPipe(resendConfirmationEmailSchema);

export type ResendConfirmationEmailRequest = z.infer<
  typeof resendConfirmationEmailSchema
>;
