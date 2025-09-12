import { SharedItem } from 'src/domain/our-city/enterprise/entities/shared-item';

export type SharedItemsType = {
  serviceOptions: SharedItem[];
  accessibility: SharedItem[];
  environments: SharedItem[];
  categories: SharedItem[];
  amenities: SharedItem[];
  audience: SharedItem[];
  payments: SharedItem[];
  planning: SharedItem[];
  parking: SharedItem[];
  menu: SharedItem[];
  pets: SharedItem[];
};
