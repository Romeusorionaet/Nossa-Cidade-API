import { CustomTag } from 'src/domain/our-city/enterprise/value-objects/custom-tag';

export type ProductCustomTagType = {
  customTags: CustomTag[];
  productId: string;
};
