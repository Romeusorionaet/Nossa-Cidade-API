import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const productSchema = z.object({
  businessPointId: z.string(),
  businessPointName: z.string(),
  title: z
    .string()
    .min(3, { message: 'Título muito curto.' })
    .max(80, { message: 'Título muito longo.' }),
  price: z.string(),
  customTags: z
    .array(z.string())
    .max(5, { message: 'No máximo 5 tags são permitidas' })
    .optional(),
});

export const productSchemaValidationPipe = new ZodValidationPipe(productSchema);

export type productRequest = z.infer<typeof productSchema>;
