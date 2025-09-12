import { SharedBusinessPointCategoriesType } from 'src/infra/database/schemas';

export class CategoryPresenter {
  static toHTTP(sharedItem: SharedBusinessPointCategoriesType) {
    return {
      id: sharedItem.id.toString(),
      name: sharedItem.name,
      searchName: sharedItem.searchName,
    };
  }
}
