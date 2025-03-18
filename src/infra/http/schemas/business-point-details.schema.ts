import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const businessPointDetailsSchema = z.object({
  businessPointId: z.string().uuid(),
  payments: z.array(z.string()).optional(),
  pets: z.array(z.string()).optional(),
  planning: z.array(z.string()).optional(),
  accessibility: z.array(z.string()).optional(),
  parking: z.array(z.string()).optional(),
  audience: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  menu: z.array(z.string()).optional(),
  serviceOptions: z.array(z.string()).optional(),
  environments: z.array(z.string()).optional(),
});

export const businessPointDetailsSchemaValidationPipe = new ZodValidationPipe(
  businessPointDetailsSchema,
);

export type businessPointDetailsRequest = z.infer<
  typeof businessPointDetailsSchema
>;
