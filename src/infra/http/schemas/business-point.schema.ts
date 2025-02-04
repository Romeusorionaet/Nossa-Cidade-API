import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const businessPointSchema = z.object({
  categoryId: z.string().uuid(),
  ownerId: z.string().uuid(),
  name: z.string(),
  location: z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
  }),
  status: z.nativeEnum(BusinessPointStatus),
  openingHours: z.string(),
  censorship: z.boolean(),
});

export const businessPointSchemaValidationPipe = new ZodValidationPipe(
  businessPointSchema,
);

export type businessPointRequest = z.infer<typeof businessPointSchema>;
