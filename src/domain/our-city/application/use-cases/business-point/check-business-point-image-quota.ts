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

    const maximumSizeQuota = Number(currentQuota + BusinessPointImageQuota);

    if (maximumSizeQuota >= currentQuota) {
      return left(new BusinessPointImageLimitExceededError());
    }

    return right({});
  }
}
