import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database.client';
import { CategoryTagsRepository } from 'src/domain/our-city/application/repositories/category-tags.repository';
import { SearchableText } from 'src/domain/our-city/enterprise/value-objects/searchable-text';
import { sharedCategoryTags } from '../schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleCategoryTagsRepository implements CategoryTagsRepository {
  constructor(private drizzle: DatabaseClient) {}
  async findById(tagId: string): Promise<{
    id: string;
    tag: string;
    businessPointCategoryId: string;
  } | null> {
    const [tag] = await this.drizzle.database
      .select()
      .from(sharedCategoryTags)
      .where(eq(sharedCategoryTags.id, tagId));

    if (!tag) {
      return null;
    }

    return tag;
  }

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

  async deleteAllFromCategory(categoryId: string): Promise<void> {
    await this.drizzle.database
      .delete(sharedCategoryTags)
      .where(eq(sharedCategoryTags.businessPointCategoryId, categoryId));
  }

  async delete(tagId: string): Promise<void> {
    await this.drizzle.database
      .delete(sharedCategoryTags)
      .where(eq(sharedCategoryTags.id, tagId));
  }
}
