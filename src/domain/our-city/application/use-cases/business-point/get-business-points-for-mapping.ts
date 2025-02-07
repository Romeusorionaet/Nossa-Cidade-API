import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

type GetBusinessPointsForMappingUseCaseResponse = Either<
  null,
  {
    businessPoints: BusinessPointForMappingType[];
  }
>;

@Injectable()
export class GetBusinessPointsForMappingUseCase {
  constructor(private businessPointRepository: BusinessPointRepository) {}

  async execute(): Promise<GetBusinessPointsForMappingUseCaseResponse> {
    const businessPoints =
      await this.businessPointRepository.findAllForMapping();

    return right({ businessPoints });
  }
}
