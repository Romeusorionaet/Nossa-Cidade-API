import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const productSchema = z.object({
  businessPointId: z.string(),
  title: z.string(),
  price: z.string(),
  customTags: z
    .array(z.string())
    .max(5, { message: 'No máximo 5 tags são permitidas' })
    .optional(),
});

export const productSchemaValidationPipe = new ZodValidationPipe(productSchema);

export type productRequest = z.infer<typeof productSchema>;
