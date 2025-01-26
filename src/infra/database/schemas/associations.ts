import {
  serviceOptions,
  accessibility,
  amenities,
  payments,
  audience,
  planning,
  parking,
  menu,
  pets,
} from './shared';
import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { businessPoints } from './essential';

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
