import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { SharedAssociationRepository } from '../../repositories/shared-association.repository';
import { SharedItemsType } from 'src/core/@types/shared-items-type';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { BusinessPointNotFoundError } from '../errors/business-point-not-found-error';

type GetSharedItemsAssociatedBusinessPointUseCaseRequest = {
  businessPointId: string;
};

type GetSharedItemsAssociatedBusinessPointUseCaseResponse = Either<
  BusinessPointNotFoundError,
  {
    sharedItemsAssociated: SharedItemsType;
  }
>;

@Injectable()
export class GetSharedItemsAssociatedBusinessPointUseCase {
  constructor(
    private readonly sharedItemsRepository: SharedAssociationRepository,
    private readonly businessPointRepository: BusinessPointRepository,
  ) {}

  async execute({
    businessPointId,
  }: GetSharedItemsAssociatedBusinessPointUseCaseRequest): Promise<GetSharedItemsAssociatedBusinessPointUseCaseResponse> {
    const result = await this.businessPointRepository.findById(businessPointId);

    if (!result) {
      return left(new BusinessPointNotFoundError());
    }

    const sharedItemsAssociated =
      await this.sharedItemsRepository.findAll(businessPointId);

    return right({ sharedItemsAssociated });
  }
}
