import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database.client';
import { CategoryTagsRepository } from 'src/domain/our-city/application/repositories/category-tags.repository';
import { SearchableText } from 'src/domain/our-city/enterprise/value-objects/searchable-text';
import { sharedCategoryTags } from '../schemas';

@Injectable()
export class DrizzleCategoryTagsRepository implements CategoryTagsRepository {
  constructor(private drizzle: DatabaseClient) {}
  async create({
    categoryTags,
    categoryId,
  }: {
    categoryTags: SearchableText[];
    categoryId: string;
  }): Promise<void> {
    await this.drizzle.database.insert(sharedCategoryTags).values(
      categoryTags.map((tag) => ({
        tag: tag.value,
        businessPointCategoryId: categoryId,
      })),
    );
  }

  async deleteAll(categoryId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
