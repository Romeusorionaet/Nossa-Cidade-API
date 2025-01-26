import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const pets = pgTable('pets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const planning = pgTable('planning', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const accessibility = pgTable('accessibility', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const parking = pgTable('parking', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const payments = pgTable('payments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const audience = pgTable('audience', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const amenities = pgTable('amenities', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const menu = pgTable('menu', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const serviceOptions = pgTable('service_options', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});
