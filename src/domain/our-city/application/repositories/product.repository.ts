import { Product } from '../../enterprise/entities/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;

  //   abstract update(
  //     productId: string,
  //     product: Partial<ProductProps>,
  //   ): Promise<void>;

  //   abstract saveImageUrls(productImagesUrls: ProductImage[]): Promise<void>;
}
