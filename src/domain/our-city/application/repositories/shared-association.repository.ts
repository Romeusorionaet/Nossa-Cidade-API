import { SharedItemsType } from 'src/core/@types/shared-items-type';
import { SharedItemsAssociateKeysEnum } from '../shared/enums/shared-items-associate-keys.enum';

export abstract class SharedAssociationRepository {
  abstract findAll(businessPointId: string): Promise<SharedItemsType>;
  abstract update(
    newListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>,
    businessPointId: string,
  ): Promise<void>;
  abstract remove(
    removedListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>,
    businessPointId: string,
  ): Promise<void>;
}
