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
  integer,
} from 'drizzle-orm/pg-core';
import { businessPointStatusEnum } from './enums.schema';
import { sharedBusinessPointCategories } from './shared.schema';
import { createId } from '@paralleldrive/cuid2';
import { InferSelectModel } from 'drizzle-orm';
import { users } from './user.schema';

export const businessPoints = pgTable(
  'business_points',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar('name', { length: 45 }).notNull(),
    searchName: text('search_name'),
    categoryId: text('category_id')
      .references(() => sharedBusinessPointCategories.id)
      .notNull(),
    description: varchar('description', { length: 500 }),
    location: geometry('location', {
      type: 'point',
      mode: 'xy',
      srid: 4326,
    })
      .notNull()
      .unique(),
    status: businessPointStatusEnum('status').default('ACTIVE'),
    openingHours: jsonb('opening_hours').notNull(),
    website: varchar('website', { length: 500 }),
    awaitingApproval: boolean('awaiting_approval').default(true),
    censorship: boolean('censorship').default(false),
    highlight: varchar('highlight', { length: 100 }),
    neighborhood: varchar('neighborhood', { length: 50 }),
    street: varchar('street', { length: 50 }),
    houseNumber: integer('house_number'),
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
export type BusinessPointSelectModelType = InferSelectModel<
  typeof businessPoints
>;

export const businessPointImages = pgTable('business_point_images', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  url: text('url').notNull(),
  businessPointId: text('business_point_id')
    .references(() => businessPoints.id, { onDelete: 'cascade' })
    .notNull(),
});
export type BusinessPointImageSelectModelType = InferSelectModel<
  typeof businessPointImages
>;

export const businessPointCustomTags = pgTable('business_point_custom_tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  businessPointId: text('business_point_id')
    .references(() => businessPoints.id, { onDelete: 'cascade' })
    .notNull(),
  tag: varchar('tag', { length: 25 }).notNull(),
});
export type BusinessPointCustomTagsSelectModelType = InferSelectModel<
  typeof businessPointCustomTags
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
export type BusinessPointFavoritesSelectModelType = InferSelectModel<
  typeof businessPointFavorites
>;
