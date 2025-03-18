import { SharedItemProps } from 'src/domain/our-city/enterprise/entities/shared-item';
//TODO remove get
export type GetSharedItemsType = {
  serviceOptions: SharedItemProps[];
  accessibility: SharedItemProps[];
  environments: SharedItemProps[];
  categories: SharedItemProps[];
  amenities: SharedItemProps[];
  audience: SharedItemProps[];
  payments: SharedItemProps[];
  planning: SharedItemProps[];
  parking: SharedItemProps[];
  menu: SharedItemProps[];
  pets: SharedItemProps[];
};
