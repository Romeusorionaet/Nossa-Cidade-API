import { SearchableText } from '../../enterprise/value-objects/searchable-text';

export abstract class CategoryTagsRepository {
  abstract deleteAllFromCategory(categoryId: string): Promise<void>;
  abstract delete(tagId: string): Promise<void>;
  abstract findAllFromCategory(categoryId: string): Promise<CategoryTag[]>;
  abstract findById(tagId: string): Promise<CategoryTag | null>;
  abstract create({
    categoryTags,
    categoryId,
  }: {
    categoryTags: SearchableText[];
    categoryId: string;
  }): Promise<void>;
}
