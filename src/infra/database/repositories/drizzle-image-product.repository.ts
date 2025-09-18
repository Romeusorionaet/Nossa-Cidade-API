import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { ImageProductRepository } from 'src/domain/our-city/application/repositories/image-product.repository';
import { eq, inArray, sql } from 'drizzle-orm';
import { productImages } from '../schemas';
import { ProductImage } from 'src/domain/our-city/enterprise/entities/product-image';
import { DrizzleProductImageMapper } from '../mappers/drizzle-product-image.mapper';

@Injectable()
export class DrizzleImageProductRepository implements ImageProductRepository {
  constructor(private drizzle: DatabaseClient) {}
  async checkQuotaById(productId: string): Promise<number> {
    const [result] = await this.drizzle.database
      .select({
        count: sql<number>`COUNT(*) AS INTEGER`,
      })
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .execute();

    return result.count ?? 0;
  }
  async findImageUrlsByProductIds(
    productIds: string[],
  ): Promise<ProductImageType[]> {
    if (!productIds.length) return [];

    const imageUrls = await this.drizzle.database
      .select()
      .from(productImages)
      .where(inArray(productImages.productId, productIds));

    return imageUrls;
  }
  async existsByUrlId(urlId: string): Promise<boolean> {
    const [result] = await this.drizzle.database
      .select({ count: sql<number>`COUNT(*) AS INTEGER` })
      .from(productImages)
      .where(eq(productImages.id, urlId));

    return result.count > 0;
  }
  async deleteByUrlId(urlId: string): Promise<void> {
    await this.drizzle.database
      .delete(productImages)
      .where(eq(productImages.id, urlId));
  }

  async saveImageUrls(productImagesUrls: ProductImage[]): Promise<void> {
    const data = productImagesUrls.map(DrizzleProductImageMapper.toDrizzle);

    await this.drizzle.database.insert(productImages).values(data);
  }
}
