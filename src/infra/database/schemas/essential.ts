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
import { createId } from '@paralleldrive/cuid2';
import { statusEnum } from './enums';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  publicId: text('public_id').$defaultFn(() => createId()),
  username: varchar('username', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  avatar: varchar('avatar', { length: 500 }),
  role: varchar('role', { length: 50 }).default('novato'),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const businessPoints = pgTable(
  'business_points',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 250 }),
    categoryId: text('category_id')
      .references(() => categories.id)
      .notNull(),
    location: geometry('location', {
      type: 'point',
      mode: 'xy',
      srid: 4326,
    }).notNull(),
    menu: jsonb('menu').notNull(),
    status: statusEnum('status').default('ativo'),
    openingHours: jsonb('opening_hours'),
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

export const favorites = pgTable(
  'favorites',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    businessPointId: text('business_point_id')
      .notNull()
      .references(() => businessPoints.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.userId, t.businessPointId] }),
    },
  ],
);

export const categories = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
