import { BusinessPointDraftRepository } from 'src/domain/our-city/application/repositories/business-point-draft.repository';
import { BusinessPointDraft } from 'src/domain/our-city/enterprise/entities/business-point-draft';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { DrizzleBusinessPointDraftMapper } from '../mappers/drizzle-business-point-draft.mapper';
import { businessPointDrafts } from '../schemas/drafts.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleBusinessPointDraftRepository
  implements BusinessPointDraftRepository
{
  constructor(private drizzle: DatabaseClient) {}
  async create(businessPointDraft: BusinessPointDraft): Promise<void> {
    const data = DrizzleBusinessPointDraftMapper.toDrizzle(businessPointDraft);
    await this.drizzle.database.insert(businessPointDrafts).values(data);
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
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
