import {
  primaryKey,
  timestamp,
  geometry,
  pgTable,
  boolean,
  varchar,
  integer,
  pgEnum,
  jsonb,
  index,
  text,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const statusEnum = pgEnum('business_point_status', ['ativo', 'inativo']);

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

export const pets = pgTable('pets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const businessPointToPetsAssociation = pgTable(
  'business_point_to_pets_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    petsId: text('pets_id')
      .references(() => pets.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.petsId] }),
    },
  ],
);

export const planning = pgTable('planning', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const businessPointToPlanningAssociation = pgTable(
  'business_point_to_planning_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    planningId: text('planning_id')
      .references(() => planning.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.planningId] }),
    },
  ],
);

export const accessibility = pgTable('accessibility', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const businessPointToAccessibilityAssociation = pgTable(
  'business_point_to_accessibility_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    accessibilityId: text('accessibility_id')
      .references(() => accessibility.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.accessibilityId] }),
    },
  ],
);

export const parking = pgTable('parking', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const businessPointToParkingAssociation = pgTable(
  'business_point_to_parking_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    parkingId: text('parking_id')
      .references(() => parking.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.parkingId] }),
    },
  ],
);

export const payments = pgTable('payments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const businessPointToPaymentsAssociation = pgTable(
  'business_point_to_payment_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    paymentsId: text('payments_id')
      .references(() => payments.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.paymentsId] }),
    },
  ],
);

export const audience = pgTable('audience', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const businessPointToAudienceAssociation = pgTable(
  'business_point_to_audience_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    audienceId: text('audience_id')
      .references(() => audience.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.audienceId] }),
    },
  ],
);

export const amenities = pgTable('amenities', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const businessPointToAmenitiesAssociation = pgTable(
  'business_point_to_amenities_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    amenitiesId: text('amenities_id')
      .references(() => amenities.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.amenitiesId] }),
    },
  ],
);

export const menu = pgTable('menu', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const businessPointToMenuAssociation = pgTable(
  'business_point_to_menu_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    menuId: text('menu_id')
      .references(() => menu.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.menuId] }),
    },
  ],
);

export const serviceOptions = pgTable('service_options', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const businessPointToServiceOptionAssociation = pgTable(
  'business_point_to_service_option_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id)
      .notNull(),
    serviceOptionId: text('service_option_id')
      .references(() => serviceOptions.id)
      .notNull(),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.businessPointId, t.serviceOptionId] }),
    },
  ],
);

export const favorites = pgTable(
  'favorites',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    businessPointId: integer('business_point_id')
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

export const businessPointsSpatialIndex = `
  CREATE INDEX business_points_location_idx ON business_points USING GIST (ST_GeographyFromText(location::text));
`;
