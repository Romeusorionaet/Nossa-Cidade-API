import { createId } from '@paralleldrive/cuid2';
import { InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import {
  billingCycleEnum,
  staffStatusEnum,
  statusPlanEnum,
  usersRoleEnum,
} from './enums.schema';
import { plans } from './plans.schema';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  publicId: text('public_id').$defaultFn(() => createId()),
  username: varchar('username', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  avatar: varchar('avatar', { length: 500 }),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
export type UsersSelectModelType = InferSelectModel<typeof users>;

export const staff = pgTable('staff', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  role: usersRoleEnum('role').notNull(),
  status: staffStatusEnum('status').default('ACTIVE'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
});
export type StaffSelectModelType = InferSelectModel<typeof staff>;

export const userPlans = pgTable('user_plans', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  planId: text('plan_id')
    .notNull()
    .references(() => plans.id),
  status: statusPlanEnum('status').default('ACTIVE').notNull(),
  billingCycle: billingCycleEnum('billing-cycle'),
  priceAtPurchase: integer('price_at_purchase').notNull(),
  startDate: timestamp('start_date', { withTimezone: true })
    .defaultNow()
    .notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
  paymentReference: text('payment_reference'),
});
export type UserPlansSelectModelType = InferSelectModel<typeof userPlans>;
