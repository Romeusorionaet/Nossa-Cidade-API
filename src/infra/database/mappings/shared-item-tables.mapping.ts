import {
  sharedPets,
  sharedPlanning,
  sharedAccessibility,
  sharedParking,
  sharedPayments,
  sharedAudience,
  sharedAmenities,
  sharedMenu,
  sharedServiceOptions,
  sharedEnvironment,
  sharedBusinessPointCategories,
} from '../schemas/index';

export const SHARED_ITEM_TABLES_MAPPING = {
  pets: sharedPets,
  planning: sharedPlanning,
  accessibility: sharedAccessibility,
  parking: sharedParking,
  payments: sharedPayments,
  audience: sharedAudience,
  amenities: sharedAmenities,
  menu: sharedMenu,
  serviceOptions: sharedServiceOptions,
  environments: sharedEnvironment,
  categories: sharedBusinessPointCategories,
} as const;
