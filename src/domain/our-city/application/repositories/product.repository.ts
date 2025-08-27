import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Product } from '../../enterprise/entities/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;

  // abstract update(
  //   productId: string,
  //   product: Partial<ProductProps>,
  // ): Promise<void>;
  abstract delete(productId: string): Promise<void>;
  abstract findById(productId: string): Promise<{ id: string } | null>;
  abstract findMany(page: PaginationParams): Promise<Product[]>;
}
