import {
  primaryKey,
  timestamp,
  geometry,
  pgTable,
  boolean,
  varchar,
  jsonb,
  index,
  text,
} from 'drizzle-orm/pg-core';
import {
  businessPointStatusEnum,
  staffStatusEnum,
  usersRoleEnum,
} from './enums.schema';
import { createId } from '@paralleldrive/cuid2';
import { InferSelectModel } from 'drizzle-orm';

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
export type UsersInsertType = InferSelectModel<typeof users>;

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
export type StaffInsertType = InferSelectModel<typeof staff>;

export const businessPoints = pgTable(
  'business_points',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 250 }),
    categoryId: text('category_id')
      .references(() => businessPointCategories.id)
      .notNull(),
    location: geometry('location', {
      type: 'point',
      mode: 'xy',
      srid: 4326,
    }).notNull(),
    status: businessPointStatusEnum('status').default('ACTIVE'),
    openingHours: jsonb('opening_hours').notNull(),
    images: jsonb('images'),
    website: varchar('website', { length: 500 }),
    tags: jsonb('tags'),
    censorship: boolean('censorship').default(false),
    highlight: varchar('highlight', { length: 100 }),
    ownerId: text('owner_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    {
      spatialIndex: index('spatial_index').using('gist', t.location),
    },
  ],
);
export type BusinessPointInsertType = InferSelectModel<typeof businessPoints>;

export const businessPointCategories = pgTable('business_point_categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});
export type BusinessPointCategoriesInsertType = InferSelectModel<
  typeof businessPointCategories
>;

export const businessPointFavorites = pgTable(
  'business_point_favorites',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    businessPointId: text('business_point_id')
      .notNull()
      .references(() => businessPoints.id),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.userId, t.businessPointId] }),
    },
  ],
);
export type BusinessPointFavorites = InferSelectModel<
  typeof businessPointFavorites
>;
