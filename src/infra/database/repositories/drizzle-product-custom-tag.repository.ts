import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database.client';
import { ProductCustomTagRepository } from 'src/domain/our-city/application/repositories/product-custom-tag.repository';
import { ProductCustomTagType } from 'src/core/@types/product-custom-tag-type';
import { productCustomTags } from '../schemas';

@Injectable()
export class DrizzleProductCustomTagRepository
  implements ProductCustomTagRepository
{
  constructor(private drizzle: DatabaseClient) {}
  async create({ customTags, productId }: ProductCustomTagType): Promise<void> {
    await this.drizzle.database.insert(productCustomTags).values(
      customTags.map((tag) => ({
        productId,
        tag: tag.getValue(),
      })),
    );
  }
}
