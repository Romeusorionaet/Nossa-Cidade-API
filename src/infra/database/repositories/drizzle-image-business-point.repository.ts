import { ImageBusinessPointRepository } from 'src/domain/our-city/application/repositories/image-business-point.repository';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { businessPointImages } from '../schemas';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class DrizzleImageBusinessPointRepository
  implements ImageBusinessPointRepository
{
  constructor(private drizzle: DatabaseClient) {}
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
}
