export const SHARED_ITEMS_ASSOCIATIONS = [
  {
    key: 'pets',
    joinTable: 'business_point_to_pets_association',
    joinColumn: 'pets_id',
  },
  {
    key: 'planning',
    joinTable: 'business_point_to_planning_association',
    joinColumn: 'planning_id',
  },
  {
    key: 'accessibility',
    joinTable: 'business_point_to_accessibility_association',
    joinColumn: 'accessibility_id',
  },
  {
    key: 'parking',
    joinTable: 'business_point_to_parking_association',
    joinColumn: 'parking_id',
  },
  {
    key: 'payments',
    joinTable: 'business_point_to_payment_association',
    joinColumn: 'payments_id',
  },
  {
    key: 'audience',
    joinTable: 'business_point_to_audience_association',
    joinColumn: 'audience_id',
  },
  {
    key: 'amenities',
    joinTable: 'business_point_to_amenities_association',
    joinColumn: 'amenities_id',
  },
  {
    key: 'menu',
    joinTable: 'business_point_to_menu_association',
    joinColumn: 'menu_id',
  },
  {
    key: 'service_options',
    joinTable: 'business_point_to_service_option_association',
    joinColumn: 'service_option_id',
  },
  {
    key: 'environment',
    joinTable: 'business_point_to_environment_association',
    joinColumn: 'environment_id',
  },
  {
    key: 'business_point_categories',
    joinTable: 'business_point_to_categories_association',
    joinColumn: 'business_point_category_id',
  },
];
