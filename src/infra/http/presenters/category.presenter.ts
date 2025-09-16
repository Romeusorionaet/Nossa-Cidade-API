import { SharedBusinessPointCategoriesSelectModelType } from 'src/infra/database/schemas';

export class CategoryPresenter {
  static toHTTP(sharedItem: SharedBusinessPointCategoriesSelectModelType) {
    return {
      id: sharedItem.id.toString(),
      name: sharedItem.name,
      searchName: sharedItem.searchName,
    };
  }
}
