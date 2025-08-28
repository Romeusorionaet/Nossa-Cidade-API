import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const updateProductSchema = z.object({
  id: z.string(),
  businessPointId: z.string(),
  title: z.string(),
  price: z.string(),
});

export const updateProductSchemaValidationPipe = new ZodValidationPipe(
  updateProductSchema,
);

export type updateProductRequest = z.infer<typeof updateProductSchema>;
