import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { SharedItem } from 'src/domain/our-city/enterprise/entities/shared-item';
import { SharedItemSelectModelType } from '../schemas';

export class DrizzleSharedItemsMapper {
  static toDomain(raw: Partial<SharedItemSelectModelType>): SharedItem {
    return SharedItem.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(sharedItem: SharedItem): SharedItemSelectModelType {
    return {
      id: sharedItem.id.toString(),
      name: sharedItem.name,
      searchName: sharedItem.searchName.value,
    };
  }
}
