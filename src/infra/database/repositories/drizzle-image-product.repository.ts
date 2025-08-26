import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { ImageProductRepository } from 'src/domain/our-city/application/repositories/image-product.repository';
import { ProductImageType } from 'src/core/@types/product-image-type';
import { eq, sql } from 'drizzle-orm';
import { productImages } from '../schemas';

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
  async findImageUrlsByProductId(
    productId: string,
  ): Promise<ProductImageType[]> {
    const imageUrls = await this.drizzle.database
      .select({
        id: productImages.id,
        url: productImages.url,
      })
      .from(productImages)
      .where(eq(productImages.productId, productId));

    if (!imageUrls.length && imageUrls.length === 0) {
      return [];
    }

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
}
