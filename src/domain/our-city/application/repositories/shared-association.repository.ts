import { SharedItemsAssociateKeysEnum } from '../shared/enums/shared-items-associate-keys.enum';
import { SharedItemsType } from 'src/core/@types/get-shared-items-type';

export abstract class SharedAssociationRepository {
  abstract findAll(): Promise<SharedItemsType>;
  abstract findAllAssociated(businessPointId: string): Promise<SharedItemsType>;
  abstract updateAssociations(
    newListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>,
    businessPointId: string,
  ): Promise<void>;
  abstract removeAssociations(
    removedListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>,
    businessPointId: string,
  ): Promise<void>;
}
