import { pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('business_point_status', [
  'ACTIVE',
  'INACTIVE',
]);

export const roleEnum = pgEnum('users_role', [
  'BEGINNER',
  'MEMBER',
  'MERCHANT',
]);
