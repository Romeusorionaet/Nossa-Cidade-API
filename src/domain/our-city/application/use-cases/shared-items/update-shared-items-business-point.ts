import { SharedItemsAssociateKeysEnum } from '../../shared/enums/shared-items-associate-keys.enum';
import { SharedItemRepository } from '../../repositories/shared-item.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface UpdateSharedItemsBusinessPointUseCaseRequest {
  businessPointId: string;
  newListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>;
  removedListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>;
}

type UpdateSharedItemsBusinessPointUseCaseResponse = Either<null, object>;

@Injectable()
export class UpdateSharedItemsBusinessPointUseCase {
  constructor(private readonly sharedItemRepository: SharedItemRepository) {}

  async execute({
    businessPointId,
    newListItems,
    removedListItems,
  }: UpdateSharedItemsBusinessPointUseCaseRequest): Promise<UpdateSharedItemsBusinessPointUseCaseResponse> {
    if (removedListItems && Object.keys(removedListItems).length > 0) {
      await this.sharedItemRepository.removeAssociations(
        removedListItems,
        businessPointId,
      );
    }

    if (newListItems && Object.keys(newListItems).length > 0) {
      await this.sharedItemRepository.updateAssociations(
        newListItems,
        businessPointId,
      );
    }

    return right({});
  }
}
