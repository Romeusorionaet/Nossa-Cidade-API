import { ProductImageType } from 'src/core/@types/product-image-type';
import { ProductImage } from '../../enterprise/entities/product-image';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export abstract class ImageProductRepository {
  abstract checkQuotaById(productId: string): Promise<number>;
  abstract findImageUrlsByProductIds(
    productIds: string[],
  ): Promise<ProductImageType[]>;
  abstract existsByUrlId(urlId: string): Promise<boolean>;
  abstract deleteByUrlId(urlId: string): Promise<void>;
  abstract saveImageUrls(productImagesUrls: ProductImage[]): Promise<void>;
}
