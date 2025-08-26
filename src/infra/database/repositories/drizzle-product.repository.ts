import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/domain/our-city/application/repositories/product.repository';
import { DatabaseClient } from '../database.client';
import { Product } from 'src/domain/our-city/enterprise/entities/product';
import { DrizzleProductMapper } from '../mappers/drizzle-product.mapper';
import { productImages, products } from '../schemas';
import { ProductImage } from 'src/domain/our-city/enterprise/entities/product-image';
import { DrizzleProductImageMapper } from '../mappers/drizzle-product-image.mapper';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(private drizzle: DatabaseClient) {}
  delete(productId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async saveImageUrls(productImagesUrls: ProductImage[]): Promise<void> {
    const data = productImagesUrls.map(DrizzleProductImageMapper.toDrizzle);

    await this.drizzle.database.insert(productImages).values(data);
  }
  async create(product: Product): Promise<void> {
    const db = this.drizzle.database;
    const data = DrizzleProductMapper.toDrizzle(product);

    await db.insert(products).values(data);
  }
}
