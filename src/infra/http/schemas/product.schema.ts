import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const productSchema = z.object({
  categoryId: z.string(),
  businessPointId: z.string(),
  title: z.string(),
  price: z.string(),
  imageURL: z
    .array(z.string())
    .max(2, { message: 'No máximo 2 imagens são permitidas' }),
  customTags: z
    .array(z.string())
    .max(5, { message: 'No máximo 5 tags são permitidas' })
    .optional(),
});

export const productSchemaValidationPipe = new ZodValidationPipe(productSchema);

export type productRequest = z.infer<typeof productSchema>;
