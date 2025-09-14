import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { BusinessPointNotFoundError } from '../errors/business-point-not-found-error';
import { BusinessPointStatusCoolDownError } from '../errors/business-point-status-cool-down-error';
import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';

type ToggleBusinessPointActiveUseCaseRequest = {
  businessPointId: string;
};

type ToggleBusinessPointActiveUseCaseResponse = Either<
  BusinessPointNotFoundError | BusinessPointStatusCoolDownError,
  object
>;

@Injectable()
export class ToggleBusinessPointActiveUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
  ) {}

  async execute({
    businessPointId,
  }: ToggleBusinessPointActiveUseCaseRequest): Promise<ToggleBusinessPointActiveUseCaseResponse> {
    const businessPoint =
      await this.businessPointRepository.findById(businessPointId);

    if (!businessPoint) {
      return left(new BusinessPointNotFoundError());
    }

    const now = new Date();
    const lastUpdate = new Date(businessPoint.updatedAt);
    const hoursSinceLastUpdate =
      (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLastUpdate < 24) {
      return left(new BusinessPointStatusCoolDownError());
    }

    businessPoint.status =
      businessPoint.status === BusinessPointStatus.ACTIVE
        ? BusinessPointStatus.INACTIVE
        : BusinessPointStatus.ACTIVE;

    await this.businessPointRepository.toggleActive(businessPoint);

    return right({});
  }
}
