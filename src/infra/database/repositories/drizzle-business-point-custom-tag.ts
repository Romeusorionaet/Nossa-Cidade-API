import { BusinessPointCustomTagRepository } from 'src/domain/our-city/application/repositories/business-point-custom-tag.repository';
import { businessPointCustomTags } from '../schemas';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DrizzleBusinessPointCustomTagRepository
  implements BusinessPointCustomTagRepository
{
  constructor(private drizzle: DatabaseClient) {}
  async create({
    customTags,
    businessPointId,
  }: BusinessPointCustomTagType): Promise<void> {
    await this.drizzle.database.insert(businessPointCustomTags).values(
      customTags.map((tag) => ({
        businessPointId,
        tag,
      })),
    );
  }
}
