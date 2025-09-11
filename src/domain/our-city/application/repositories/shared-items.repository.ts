import { SharedItemsType } from 'src/core/@types/get-shared-items-type';

export abstract class SharedItemsRepository {
  abstract findAll(): Promise<SharedItemsType>;
}
