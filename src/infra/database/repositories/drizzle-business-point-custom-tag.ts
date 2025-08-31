import { BusinessPointCustomTagRepository } from 'src/domain/our-city/application/repositories/business-point-custom-tag.repository';
import { BusinessPointCustomTagType } from 'src/core/@types/business-point-custom-tag-type';
import { businessPointCustomTags } from '../schemas';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { SearchableText } from 'src/domain/our-city/enterprise/value-objects/search-title';

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
        tag: SearchableText.createFromText(tag).value,
      })),
    );
  }
}
