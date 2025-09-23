import { createId } from '@paralleldrive/cuid2';
import { integer, jsonb, pgTable, text } from 'drizzle-orm/pg-core';
import { plansNameEnum } from './enums.schema';
import { InferSelectModel } from 'drizzle-orm';

export const plans = pgTable('plans', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: plansNameEnum('plans-name').notNull(),
  price: integer('price').notNull(),
  features: jsonb('features').default({}),
});
export type PlansSelectModelType = InferSelectModel<typeof plans>;
