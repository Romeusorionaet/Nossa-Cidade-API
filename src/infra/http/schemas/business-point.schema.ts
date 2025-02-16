import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const businessPointSchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  location: z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
  }),
  openingHours: z.record(z.any()),
});

export const businessPointSchemaValidationPipe = new ZodValidationPipe(
  businessPointSchema,
);

export type businessPointRequest = z.infer<typeof businessPointSchema>;
