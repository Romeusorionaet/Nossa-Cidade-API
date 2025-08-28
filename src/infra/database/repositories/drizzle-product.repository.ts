import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/domain/our-city/application/repositories/product.repository';
import { DatabaseClient } from '../database.client';
import { Product } from 'src/domain/our-city/enterprise/entities/product';
import { DrizzleProductMapper } from '../mappers/drizzle-product.mapper';
import { products } from '../schemas';
import { eq } from 'drizzle-orm';
import { PaginationParams } from 'src/core/repositories/pagination-params';
import { QUANTITY_OF_PRODUCTS } from 'src/core/constants/quantity-of-products';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(private drizzle: DatabaseClient) {}
  async update(product: Product): Promise<void> {
    const data = DrizzleProductMapper.toDrizzle(product);

    await this.drizzle.database
      .update(products)
      .set(data)
      .where(eq(products.id, data.id));
  }
  async findMany({ page }: PaginationParams): Promise<Product[]> {
    const offset = ((page || 1) - 1) * QUANTITY_OF_PRODUCTS.PER_PAGE;

    const result = await this.drizzle.database
      .select()
      .from(products)
      .limit(QUANTITY_OF_PRODUCTS.PER_PAGE)
      .offset(offset);

    const data = result.map(DrizzleProductMapper.toDomain);

    return data;
  }
  async findById(productId: string): Promise<Product | null> {
    const [product] = await this.drizzle.database
      .select()
      .from(products)
      .where(eq(products.id, productId));

    if (!product) {
      return null;
    }

    const data = DrizzleProductMapper.toDomain(product);

    return data;
  }
  async delete(productId: string): Promise<void> {
    await this.drizzle.database
      .delete(products)
      .where(eq(products.id, productId));
  }

  async create(product: Product): Promise<void> {
    const db = this.drizzle.database;
    const data = DrizzleProductMapper.toDrizzle(product);

    await db.insert(products).values(data);
  }
}
