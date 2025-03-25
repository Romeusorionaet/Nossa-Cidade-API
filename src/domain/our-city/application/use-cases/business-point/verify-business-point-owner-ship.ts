import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { ActionNotAllowedError } from 'src/core/errors/action-not-allowed-error';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface VerifyBusinessPointOwnershipUseCaseRequest {
  userId: string;
  businessPointId: string;
}

type VerifyBusinessPointOwnershipUseCaseResponse = Either<
  ActionNotAllowedError,
  object
>;

@Injectable()
export class VerifyBusinessPointOwnershipUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
  ) {}

  async execute({
    businessPointId,
    userId,
  }: VerifyBusinessPointOwnershipUseCaseRequest): Promise<VerifyBusinessPointOwnershipUseCaseResponse> {
    const businessPoint =
      await this.businessPointRepository.findById(businessPointId);

    const isOwner = businessPoint.ownerId.toString() === userId;

    if (!isOwner) {
      return left(new ActionNotAllowedError());
    }

    return right({});
  }
}
