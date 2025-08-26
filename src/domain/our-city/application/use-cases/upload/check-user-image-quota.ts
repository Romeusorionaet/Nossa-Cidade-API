import { BusinessPointImageLimitExceededError } from '../errors/business-point-image-limit-exceeded-error';
import { ImageBusinessPointRepository } from '../../repositories/image-business-point.repository';
import { BusinessPointImageQuota } from '../../shared/constants/business-point-image-quota';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface CheckBusinessPointImageQuotaUseCaseRequest {
  businessPointId: string;
}

type CheckBusinessPointImageQuotaUseCaseResponse = Either<
  BusinessPointImageLimitExceededError,
  object
>;
//TODO rename this file to correct name
@Injectable()
export class CheckBusinessPointImageQuotaUseCase {
  constructor(
    private readonly imageBusinessPointRepository: ImageBusinessPointRepository,
  ) {}

  async execute({
    businessPointId,
  }: CheckBusinessPointImageQuotaUseCaseRequest): Promise<CheckBusinessPointImageQuotaUseCaseResponse> {
    const currentQuota =
      await this.imageBusinessPointRepository.checkQuotaById(businessPointId);

    if (currentQuota >= BusinessPointImageQuota) {
      return left(new BusinessPointImageLimitExceededError());
    }

    return right({});
  }
}
