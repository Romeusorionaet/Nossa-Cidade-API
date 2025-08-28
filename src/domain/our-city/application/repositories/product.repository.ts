import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Product, ProductProps } from '../../enterprise/entities/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;

  abstract update(product: Product): Promise<void>;
  abstract delete(productId: string): Promise<void>;
  abstract findById(productId: string): Promise<Product | null>;
  abstract findMany(page: PaginationParams): Promise<Product[]>;
}
