import { Product } from '../../enterprise/entities/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;

  // abstract update(
  //   productId: string,
  //   product: Partial<ProductProps>,
  // ): Promise<void>;
  abstract delete(productId: string): Promise<void>;
}
