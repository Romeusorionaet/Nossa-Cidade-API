import { ProductCustomTagType } from 'src/core/@types/product-custom-tag-type';

export abstract class ProductCustomTagRepository {
  abstract create({
    customTags,
    productId,
  }: ProductCustomTagType): Promise<void>;
}
