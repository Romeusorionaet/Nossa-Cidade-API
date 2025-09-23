import { BillingCycleEnum } from 'src/domain/our-city/enterprise/entities/enums/billing-cycle';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const userPlanRequestSchema = z.object({
  planId: z.string(),
  billingCycle: z.nativeEnum(BillingCycleEnum),
  startDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  paymentReference: z.string(),
});

export const userPlanRequestSchemaValidationPipe = new ZodValidationPipe(
  userPlanRequestSchema,
);

export type UserPlanRequest = z.infer<typeof userPlanRequestSchema>;
