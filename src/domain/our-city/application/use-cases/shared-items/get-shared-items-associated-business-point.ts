import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { SharedAssociationRepository } from '../../repositories/shared-association.repository';
import { SharedItemsType } from 'src/core/@types/shared-items-type';

type GetSharedItemsAssociatedBusinessPointUseCaseRequest = {
  businessPointId: string;
};

type GetSharedItemsAssociatedBusinessPointUseCaseResponse = Either<
  null,
  {
    sharedItemsAssociated: SharedItemsType;
  }
>;

@Injectable()
export class GetSharedItemsAssociatedBusinessPointUseCase {
  constructor(
    private readonly sharedItemsRepository: SharedAssociationRepository,
  ) {}

  async execute({
    businessPointId,
  }: GetSharedItemsAssociatedBusinessPointUseCaseRequest): Promise<GetSharedItemsAssociatedBusinessPointUseCaseResponse> {
    const sharedItemsAssociated =
      await this.sharedItemsRepository.findAll(businessPointId);

    return right({ sharedItemsAssociated });
  }
}
