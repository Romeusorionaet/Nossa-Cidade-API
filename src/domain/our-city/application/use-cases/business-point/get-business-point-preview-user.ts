import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { BusinessPointPreviewType } from 'src/core/@types/business-point-preview-type';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface GetBusinessPointPreviewUserUseCaseRequest {
  id: string;
}

type GetBusinessPointsForMappingUseCaseResponse = Either<
  null,
  {
    businessPointsPreview: BusinessPointPreviewType[];
  }
>;

@Injectable()
export class GetBusinessPointPreviewUserUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
  ) {}

  async execute({
    id,
  }: GetBusinessPointPreviewUserUseCaseRequest): Promise<GetBusinessPointsForMappingUseCaseResponse> {
    const businessPointsPreview =
      await this.businessPointRepository.findBusinessPointsByUser(id);

    return right({ businessPointsPreview });
  }
}
