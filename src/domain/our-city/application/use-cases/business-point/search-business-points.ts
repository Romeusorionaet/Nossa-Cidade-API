import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface SearchBusinessPointsUseCaseRequest {
  query: string;
}

type SearchBusinessPointsUseCaseResponse = Either<
  null,
  {
    businessPoints: BusinessPointForMappingType[];
  }
>;

@Injectable()
export class SearchBusinessPointsUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
  ) {}

  async execute({
    query,
  }: SearchBusinessPointsUseCaseRequest): Promise<SearchBusinessPointsUseCaseResponse> {
    const businessPoints =
      await this.businessPointRepository.findByQuery(query);

    return right({ businessPoints });
  }
}
