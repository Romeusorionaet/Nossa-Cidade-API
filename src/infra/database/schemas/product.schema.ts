import { createId } from '@paralleldrive/cuid2';
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { businessPoints } from './essential.schema';
import { InferSelectModel } from 'drizzle-orm';

export const products = pgTable('products', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  businessPointId: text('business_point_id')
    .references(() => businessPoints.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('name', { length: 255 }).notNull(),
  price: integer(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
export type ProductsInsertType = InferSelectModel<typeof products>;

export const productCustomTags = pgTable('product_custom_tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  productId: text('business_point_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  tag: varchar('tag', { length: 25 }).notNull(),
});
export type productCustomTagsInsertType = InferSelectModel<
  typeof productCustomTags
>;

export const productImages = pgTable('product_images', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  url: text('url').notNull(),
  productId: text('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
});
export type ProductImageInsertType = InferSelectModel<typeof productImages>;
