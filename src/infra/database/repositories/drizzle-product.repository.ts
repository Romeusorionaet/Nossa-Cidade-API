import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/domain/our-city/application/repositories/product.repository';
import { DatabaseClient } from '../database.client';
import { Product } from 'src/domain/our-city/enterprise/entities/product';
import { DrizzleProductMapper } from '../mappers/drizzle-product.mapper';
import { products } from '../schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(private drizzle: DatabaseClient) {}
  async findById(productId: string): Promise<{ id: string } | null> {
    const [resultProduct] = await this.drizzle.database
      .select({ id: products.id })
      .from(products)
      .where(eq(products.id, productId));

    if (!resultProduct.id) {
      return null;
    }

    return { id: resultProduct.id };
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
