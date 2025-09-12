import { SharedItem } from 'src/domain/our-city/enterprise/entities/shared-item';

export class SharedItemPresenter {
  static toHTTP(sharedItem: SharedItem) {
    return {
      id: sharedItem.id.toString(),
      name: sharedItem.name,
    };
  }
}
