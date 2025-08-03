import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/domain/our-city/application/repositories/product.repository';
import { DatabaseClient } from '../database.client';
import { Product } from 'src/domain/our-city/enterprise/entities/product';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(private drizzle: DatabaseClient) {}
  async create(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
