import { pgTable, text, unique, varchar } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { InferSelectModel } from 'drizzle-orm';

export const sharedPets = pgTable('pets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedPlanning = pgTable('planning', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedAccessibility = pgTable('accessibility', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedParking = pgTable('parking', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedPayments = pgTable('payments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedAudience = pgTable('audience', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedAmenities = pgTable('amenities', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedMenu = pgTable('menu', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedServiceOptions = pgTable('service_options', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const sharedEnvironment = pgTable('environment', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

//TODO verify the difference
export const sharedCategoryTags = pgTable(
  'category_tags',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    businessPointCategoryId: text('business_point_category_id')
      .references(() => sharedBusinessPointCategories.id)
      .notNull(),
    tag: varchar('tag', { length: 25 }).notNull(),
  },
  (t) => [unique().on(t.businessPointCategoryId, t.tag)],
);

export const sharedBusinessPointCategories = pgTable(
  'business_point_categories',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar('name', { length: 25 }).notNull().unique(),
  },
);
export type SharedBusinessPointCategoriesType = InferSelectModel<
  typeof sharedBusinessPointCategories
>;
