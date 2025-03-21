import {
  businessPointToAccessibilityAssociation,
  businessPointToServiceOptionAssociation,
  businessPointToEnvironmentAssociation,
  businessPointToAmenitiesAssociation,
  businessPointToAudienceAssociation,
  businessPointToCategoriesAssociation,
  businessPointToPaymentsAssociation,
  businessPointToPlanningAssociation,
  businessPointToParkingAssociation,
  businessPointToMenuAssociation,
  businessPointToPetsAssociation,
} from 'src/infra/database/schemas';

export const BUSINESS_POINT_ASSOCIATIONS = Object.freeze([
  { key: 'pets', table: businessPointToPetsAssociation, column: 'petsId' },
  {
    key: 'planning',
    table: businessPointToPlanningAssociation,
    column: 'planningId',
  },
  {
    key: 'accessibility',
    table: businessPointToAccessibilityAssociation,
    column: 'accessibilityId',
  },
  {
    key: 'amenities',
    table: businessPointToAmenitiesAssociation,
    column: 'amenitiesId',
  },
  {
    key: 'audience',
    table: businessPointToAudienceAssociation,
    column: 'audienceId',
  },
  { key: 'menu', table: businessPointToMenuAssociation, column: 'menuId' },
  {
    key: 'parking',
    table: businessPointToParkingAssociation,
    column: 'parkingId',
  },
  {
    key: 'payments',
    table: businessPointToPaymentsAssociation,
    column: 'paymentsId',
  },
  {
    key: 'serviceOptions',
    table: businessPointToServiceOptionAssociation,
    column: 'serviceOptionId',
  },
  {
    key: 'environments',
    table: businessPointToEnvironmentAssociation,
    column: 'environmentId',
  },
  {
    key: 'categories',
    table: businessPointToCategoriesAssociation,
    column: 'businessPointCategoryId',
  },
]);
