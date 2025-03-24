import { ImageBusinessPointRepository } from 'src/domain/our-city/application/repositories/image-business-point.repository';
import { BusinessPointImageType } from 'src/core/@types/business-point-image-type';
import { DatabaseClient } from '../database.client';
import { businessPointImages } from '../schemas';
import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class DrizzleImageBusinessPointRepository
  implements ImageBusinessPointRepository
{
  constructor(private drizzle: DatabaseClient) {}

  async existsByUrlId(urlId: string): Promise<boolean> {
    const [result] = await this.drizzle.database
      .select({ count: sql<number>`COUNT(*) AS INTEGER` })
      .from(businessPointImages)
      .where(eq(businessPointImages.id, urlId));

    return result.count > 0;
  }

  async deleteByUrlId(urlId: string): Promise<void> {
    await this.drizzle.database
      .delete(businessPointImages)
      .where(eq(businessPointImages.id, urlId));
  }

  async checkQuotaById(businessPointId: string): Promise<number> {
    const [result] = await this.drizzle.database
      .select({
        count: sql<number>`COUNT(*) AS INTEGER`,
      })
      .from(businessPointImages)
      .where(eq(businessPointImages.businessPointId, businessPointId))
      .execute();

    return result.count ?? 0;
  }

  async findImageUrlsByBusinessPointId(
    businessPointId: string,
  ): Promise<BusinessPointImageType[]> {
    const imageUrls = await this.drizzle.database
      .select({
        id: businessPointImages.id,
        url: businessPointImages.url,
      })
      .from(businessPointImages)
      .where(eq(businessPointImages.businessPointId, businessPointId));

    if (!imageUrls.length && imageUrls.length === 0) {
      return [];
    }

    return imageUrls;
  }
}
