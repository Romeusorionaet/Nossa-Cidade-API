import { GetSharedItemsType } from 'src/core/@types/get-shared-items-type';

export abstract class SharedItemRepository {
  abstract findAll(): Promise<GetSharedItemsType>;
}
