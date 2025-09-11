import { SharedItemsAssociateKeysEnum } from '../../shared/enums/shared-items-associate-keys.enum';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { SharedAssociationRepository } from '../../repositories/shared-association.repository';

interface UpdateSharedItemsBusinessPointUseCaseRequest {
  businessPointId: string;
  newListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>;
  removedListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>;
}

type UpdateSharedItemsBusinessPointUseCaseResponse = Either<null, object>;

@Injectable()
export class UpdateSharedItemsBusinessPointUseCase {
  constructor(
    private readonly sharedItemRepository: SharedAssociationRepository,
  ) {}

  async execute({
    businessPointId,
    newListItems,
    removedListItems,
  }: UpdateSharedItemsBusinessPointUseCaseRequest): Promise<UpdateSharedItemsBusinessPointUseCaseResponse> {
    if (removedListItems && Object.keys(removedListItems).length > 0) {
      await this.sharedItemRepository.remove(removedListItems, businessPointId);
    }

    if (newListItems && Object.keys(newListItems).length > 0) {
      await this.sharedItemRepository.update(newListItems, businessPointId);
    }

    return right({});
  }
}
