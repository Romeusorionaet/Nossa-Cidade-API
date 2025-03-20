import { GetSharedItemsType } from 'src/core/@types/get-shared-items-type';
import { SharedItemsAssociateKeysEnum } from '../shared/enums/shared-items-associate-keys.enum';

export abstract class SharedItemRepository {
  abstract findAll(): Promise<GetSharedItemsType>;
  abstract findAllAssociated(
    businessPointId: string,
  ): Promise<GetSharedItemsType>;
  abstract updateAssociations(
    newListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>,
    businessPointId: string,
  ): Promise<void>;
  abstract removeAssociations(
    removedListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>,
    businessPointId: string,
  ): Promise<void>;
}
