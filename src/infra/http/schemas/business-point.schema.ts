import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const businessPointSchema = z.object({
  categoryId: z.string(),
  name: z
    .string()
    .min(6, { message: 'Nome muito curto.' })
    .max(255, { message: 'Nome muito longo.' }),
  location: z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
  }),
  tags: z.array(z.string()),
  openingHours: z.record(z.any()),
});

export const businessPointSchemaValidationPipe = new ZodValidationPipe(
  businessPointSchema,
);

export type businessPointRequest = z.infer<typeof businessPointSchema>;
