import { Product } from '../../enterprise/entities/product';
import { ProductImage } from '../../enterprise/entities/product-image';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;

  // abstract update(
  //   productId: string,
  //   product: Partial<ProductProps>,
  // ): Promise<void>;

  //TODO remove this method from here to the right repository
  abstract saveImageUrls(productImagesUrls: ProductImage[]): Promise<void>;
  abstract delete(productId: string): Promise<void>;
}
