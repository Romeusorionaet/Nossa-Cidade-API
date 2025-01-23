import { pgTable, text, geometry, index } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// for while
export const stores = pgTable(
  'stores',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text('name').notNull(),
    location: geometry('location', {
      type: 'point',
      mode: 'xy',
      srid: 4326,
    }).notNull(),
  },
  (t) => [
    {
      spatialIndex: index('spatial_index').using('gist', t.location),
    },
  ],
);
