import { SearchableText } from '../../enterprise/value-objects/searchable-text';

export abstract class CategoryTagsRepository {
  abstract deleteAllFromCategory(categoryId: string): Promise<void>;
  abstract delete(tagId: string): Promise<void>;
  abstract findById(
    tagId: string,
  ): Promise<{
    id: string;
    tag: string;
    businessPointCategoryId: string;
  } | null>;
  abstract create({
    categoryTags,
    categoryId,
  }: {
    categoryTags: SearchableText[];
    categoryId: string;
  }): Promise<void>;
}
