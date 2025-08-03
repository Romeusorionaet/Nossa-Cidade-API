import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { businessPoints } from './essential.schema';

export const product = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  businessPointId: text('business_point_id')
    .references(() => businessPoints.id, { onDelete: 'cascade' })
    .notNull(),
});
