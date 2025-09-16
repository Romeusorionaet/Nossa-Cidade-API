import {
  geometry,
  pgTable,
  boolean,
  varchar,
  jsonb,
  index,
  text,
  integer,
} from 'drizzle-orm/pg-core';
import { sharedBusinessPointCategories } from './shared.schema';
import { businessPointDraftStatusEnum } from './enums.schema';
import { createId } from '@paralleldrive/cuid2';
import { InferSelectModel } from 'drizzle-orm';
import { businessPoints } from './business-point.schema';

export const businessPointDrafts = pgTable(
  'business_point_drafts',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    businessPointId: text('business_point_id')
      .notNull()
      .references(() => businessPoints.id)
      .unique(),
    name: varchar('name', { length: 255 }),
    categoryId: text('category_id')
      .references(() => sharedBusinessPointCategories.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    description: varchar('description', { length: 500 }),
    neighborhood: varchar('neighborhood', { length: 50 }),
    street: varchar('street', { length: 50 }),
    houseNumber: integer('house_number'),
    location: geometry('location', {
      type: 'point',
      mode: 'xy',
      srid: 4326,
    }).unique(),
    status: businessPointDraftStatusEnum('status').default('PENDENT'),
    openingHours: jsonb('opening_hours'),
    website: varchar('website', { length: 500 }),
    censorship: boolean('censorship').default(false),
    highlight: varchar('highlight', { length: 100 }),
  },
  (t) => [
    {
      spatialIndex: index('spatial_index').using('gist', t.location),
    },
  ],
);
export type BusinessPointDraftSelectType = InferSelectModel<
  typeof businessPointDrafts
>;
