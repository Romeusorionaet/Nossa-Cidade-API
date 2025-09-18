import { SharedItemsType } from 'src/core/@types/shared-items-type';
import { SharedItem } from '../../enterprise/entities/shared-item';

export abstract class SharedItemsRepository {
  abstract findAll(): Promise<SharedItemsType>;
  abstract findUnique(sharedId: string): Promise<SharedItem>;
  abstract create(data: Partial<SharedItemsType>): Promise<void>;
}
