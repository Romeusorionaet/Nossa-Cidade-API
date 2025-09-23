import { pgEnum } from 'drizzle-orm/pg-core';

export const staffStatusEnum = pgEnum('staff_status', [
  'ACTIVE',
  'INACTIVE',
  'SUSPENDED',
]);

export const businessPointStatusEnum = pgEnum('business_point_status', [
  'ACTIVE',
  'INACTIVE',
]);

export const businessPointDraftStatusEnum = pgEnum(
  'business_point_draft_status',
  ['PENDENT', 'APPROVED', 'FAILED'],
);

export const usersRoleEnum = pgEnum('users_role', ['MERCHANT', 'ADMIN']);

export const plansNameEnum = pgEnum('plans-name', ['PROFESSIONAL', 'PREMIUM']);

export const billingCycleEnum = pgEnum('billing-cycle', ['MONTHLY', 'ANNUAL']);

export const statusPlanEnum = pgEnum('status-plan', [
  'ACTIVE',
  'CANCELLED',
  'EXPIRED',
]);
