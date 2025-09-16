import { BusinessPointDraftRepository } from 'src/domain/our-city/application/repositories/business-point-draft.repository';
import { BusinessPointDraft } from 'src/domain/our-city/enterprise/entities/business-point-draft';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { DrizzleBusinessPointDraftMapper } from '../mappers/drizzle-business-point-draft.mapper';
import { businessPointDrafts } from '../schemas/drafts.schema';
import { eq, sql } from 'drizzle-orm';
import { PaginationParams } from 'src/core/repositories/pagination-params';
import { QUANTITY_OF_PRODUCTS } from 'src/core/constants/quantity-of-products';
import { QUANTITY_OF_BUSINESS_POINT_DRAFT } from 'src/core/constants/quantity-of-business-point-draft';

@Injectable()
export class DrizzleBusinessPointDraftRepository
  implements BusinessPointDraftRepository
{
  constructor(private drizzle: DatabaseClient) {}
  async findMany({ page }: PaginationParams): Promise<BusinessPointDraft[]> {
    const offset =
      ((page || 1) - 1) * QUANTITY_OF_BUSINESS_POINT_DRAFT.PER_PAGE;

    const result = await this.drizzle.database
      .select()
      .from(businessPointDrafts)
      .limit(QUANTITY_OF_PRODUCTS.PER_PAGE)
      .offset(offset);

    const data = result.map(DrizzleBusinessPointDraftMapper.toDomain);

    return data;
  }
  async create(businessPointDraft: BusinessPointDraft): Promise<void> {
    const data = DrizzleBusinessPointDraftMapper.toDrizzle(businessPointDraft);

    const insertData = {
      ...data,
      location: data.location
        ? sql`ST_SetSRID(ST_MakePoint(${data.location.x}, ${data.location.y}), 4326)`
        : null,
    };

    await this.drizzle.database.insert(businessPointDrafts).values(insertData);
  }

  async findByBusinessPointId(
    businessPointId: string,
  ): Promise<BusinessPointDraft | null> {
    const [businessPointDraft] = await this.drizzle.database
      .select()
      .from(businessPointDrafts)
      .where(eq(businessPointDrafts.businessPointId, businessPointId));

    if (!businessPointDraft) {
      return null;
    }

    return DrizzleBusinessPointDraftMapper.toDomain(businessPointDraft);
  }
  async delete(id: string): Promise<void> {
    await this.drizzle.database
      .delete(businessPointDrafts)
      .where(eq(businessPointDrafts.id, id));
  }
}
