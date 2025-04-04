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
