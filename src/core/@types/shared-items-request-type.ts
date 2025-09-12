export type SharedItemsRequestType = Partial<{
  serviceOptions: { name: string }[];
  accessibility: { name: string }[];
  environments: { name: string }[];
  categories: { name: string }[];
  amenities: { name: string }[];
  audience: { name: string }[];
  payments: { name: string }[];
  planning: { name: string }[];
  parking: { name: string }[];
  menu: { name: string }[];
  pets: { name: string }[];
}>;
