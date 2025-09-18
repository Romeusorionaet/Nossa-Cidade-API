import { SearchableText } from '../../enterprise/value-objects/searchable-text';

export abstract class CategoryTagsRepository {
  abstract deleteAll(categoryId: string): Promise<void>;
  abstract create({
    categoryTags,
    categoryId,
  }: {
    categoryTags: SearchableText[];
    categoryId: string;
  }): Promise<void>;
}
