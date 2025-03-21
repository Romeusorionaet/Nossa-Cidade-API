import { SharedItemRepository } from '../../repositories/shared-item.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { GetSharedItemsType } from 'src/core/@types/get-shared-items-type';

type GetSharedItemsAssociatedBusinessPointUseCaseRequest = {
  businessPointId: string;
};

type GetSharedItemsAssociatedBusinessPointUseCaseResponse = Either<
  null,
  {
    sharedItemsAssociated: GetSharedItemsType;
  }
>;

@Injectable()
export class GetSharedItemsAssociatedBusinessPointUseCase {
  constructor(private readonly sharedItemsRepository: SharedItemRepository) {}

  async execute({
    businessPointId,
  }: GetSharedItemsAssociatedBusinessPointUseCaseRequest): Promise<GetSharedItemsAssociatedBusinessPointUseCaseResponse> {
    const sharedItemsAssociated =
      await this.sharedItemsRepository.findAllAssociated(businessPointId);

    return right({ sharedItemsAssociated });
  }
}
