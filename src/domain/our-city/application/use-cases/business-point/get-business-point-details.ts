import { GetBusinessPointDetailsType } from 'src/core/@types/get-business-point-details-type';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface GetBusinessPointDetailsUseCaseRequest {
  id: string;
}

type GetBusinessPointsForMappingUseCaseResponse = Either<
  null,
  {
    businessPointDetails: GetBusinessPointDetailsType;
  }
>;

@Injectable()
export class GetBusinessPointDetailsUseCase {
  constructor(private businessPointRepository: BusinessPointRepository) {}

  async execute({
    id,
  }: GetBusinessPointDetailsUseCaseRequest): Promise<GetBusinessPointsForMappingUseCaseResponse> {
    const businessPointDetails =
      await this.businessPointRepository.findDetailsById(id);

    return right({ businessPointDetails });
  }
}
