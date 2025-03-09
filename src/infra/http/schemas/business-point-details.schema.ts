import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const businessPointDetailsSchema = z.object({
  businessPointId: z.string().uuid(),
  pets: z.array(z.string()),
  planning: z.array(z.string()),
  accessibility: z.array(z.string()),
  parking: z.array(z.string()),
  payments: z.array(z.string()),
  audience: z.array(z.string()),
  amenities: z.array(z.string()),
  menu: z.array(z.string()),
  serviceOptions: z.array(z.string()),
  environments: z.array(z.string()),
});

export const businessPointDetailsSchemaValidationPipe = new ZodValidationPipe(
  businessPointDetailsSchema,
);

export type businessPointDetailsRequest = z.infer<
  typeof businessPointDetailsSchema
>;
