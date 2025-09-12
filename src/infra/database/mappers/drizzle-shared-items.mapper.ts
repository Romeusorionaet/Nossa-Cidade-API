import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { SharedItemInsertType } from '../schemas';
import { SharedItem } from 'src/domain/our-city/enterprise/entities/shared-item';

export class DrizzleSharedItemsMapper {
  static toDomain(raw: Partial<SharedItemInsertType>): SharedItem {
    return SharedItem.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(sharedItem: SharedItem): SharedItemInsertType {
    return {
      id: sharedItem.id.toString(),
      name: sharedItem.name,
      searchName: sharedItem.searchName.value,
    };
  }
}
