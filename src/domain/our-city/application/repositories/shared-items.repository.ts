import { SharedItemsType } from 'src/core/@types/shared-items-type';

export abstract class SharedItemsRepository {
  abstract findAll(): Promise<SharedItemsType>;
  abstract create(data: Partial<SharedItemsType>): Promise<void>;
}
