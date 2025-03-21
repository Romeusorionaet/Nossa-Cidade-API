import {
  sharedBusinessPointCategories,
  sharedServiceOptions,
  sharedAccessibility,
  sharedEnvironment,
  sharedAmenities,
  sharedPayments,
  sharedAudience,
  sharedPlanning,
  sharedParking,
  sharedMenu,
  sharedPets,
} from './shared.schema';
import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { businessPoints } from './essential.schema';

export const businessPointToPetsAssociation = pgTable(
  'business_point_to_pets_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    petsId: text('pets_id')
      .references(() => sharedPets.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.petsId],
      name: 'business_point_to_pets_association_pk',
    }),
  ],
);

export const businessPointToPlanningAssociation = pgTable(
  'business_point_to_planning_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    planningId: text('planning_id')
      .references(() => sharedPlanning.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.planningId],
      name: 'business_point_to_planning_association_pk',
    }),
  ],
);

export const businessPointToAccessibilityAssociation = pgTable(
  'business_point_to_accessibility_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    accessibilityId: text('accessibility_id')
      .references(() => sharedAccessibility.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.accessibilityId],
      name: 'business_point_to_accessibility_association_pk',
    }),
  ],
);

export const businessPointToParkingAssociation = pgTable(
  'business_point_to_parking_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    parkingId: text('parking_id')
      .references(() => sharedParking.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.parkingId],
      name: 'business_point_to_parking_association_pk',
    }),
  ],
);

export const businessPointToPaymentsAssociation = pgTable(
  'business_point_to_payment_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    paymentsId: text('payments_id')
      .references(() => sharedPayments.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.paymentsId],
      name: 'business_point_to_payment_association_pk',
    }),
  ],
);

export const businessPointToAudienceAssociation = pgTable(
  'business_point_to_audience_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    audienceId: text('audience_id')
      .references(() => sharedAudience.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.audienceId],
      name: 'business_point_to_audience_association_pk',
    }),
  ],
);

export const businessPointToAmenitiesAssociation = pgTable(
  'business_point_to_amenities_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    amenitiesId: text('amenities_id')
      .references(() => sharedAmenities.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.amenitiesId],
      name: 'business_point_to_amenities_association_pk',
    }),
  ],
);

export const businessPointToMenuAssociation = pgTable(
  'business_point_to_menu_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    menuId: text('menu_id')
      .references(() => sharedMenu.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.menuId],
      name: 'business_point_to_menu_association_pk',
    }),
  ],
);

export const businessPointToServiceOptionAssociation = pgTable(
  'business_point_to_service_option_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    serviceOptionId: text('service_option_id')
      .references(() => sharedServiceOptions.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.serviceOptionId],
      name: 'business_point_to_service_option_association_pk',
    }),
  ],
);

export const businessPointToEnvironmentAssociation = pgTable(
  'business_point_to_environment_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    environmentId: text('environment_id')
      .references(() => sharedEnvironment.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.environmentId],
      name: 'business_point_to_environment_association_pk',
    }),
  ],
);

export const businessPointToCategoriesAssociation = pgTable(
  'business_point_to_categories_association',
  {
    businessPointId: text('business_point_id')
      .references(() => businessPoints.id, { onDelete: 'cascade' })
      .notNull(),
    businessPointCategoryId: text('business_point_category_id')
      .references(() => sharedBusinessPointCategories.id)
      .notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.businessPointId, t.businessPointCategoryId],
      name: 'business_point_categories_association_pk',
    }),
  ],
);
