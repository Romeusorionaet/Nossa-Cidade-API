import { BusinessPointProps } from 'src/domain/our-city/enterprise/entities/business-point';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { BusinessPointImageType } from 'src/core/@types/business-point-image-type';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface GetBusinessPointOverviewUseCaseRequest {
  id: string;
}

type GetBusinessPointsForMappingUseCaseResponse = Either<
  null,
  {
    businessPoint: BusinessPointProps;
    imageUrls: BusinessPointImageType[];
  }
>;

@Injectable()
export class GetBusinessPointOverviewUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
  ) {}

  async execute({
    id,
  }: GetBusinessPointOverviewUseCaseRequest): Promise<GetBusinessPointsForMappingUseCaseResponse> {
    const businessPoint = await this.businessPointRepository.findById(id);
    const imageUrls = await this.businessPointRepository.findImageUrlsById(id);

    return right({ businessPoint, imageUrls });
  }
}
