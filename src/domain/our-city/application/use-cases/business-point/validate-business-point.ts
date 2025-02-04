import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { GeometryPoint } from 'src/core/@types/geometry';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface ValidateBusinessPointUseCaseRequest {
  location: GeometryPoint;
}

type ValidateBusinessPointUseCaseResponse = Either<null, object>;

@Injectable()
export class ValidateBusinessPointUseCase {
  constructor(private businessPointRepository: BusinessPointRepository) {}

  async execute({
    location,
  }: ValidateBusinessPointUseCaseRequest): Promise<ValidateBusinessPointUseCaseResponse> {
    await this.businessPointRepository.findByCoordinate(location);

    //TODO do validation

    return right({});
  }
}
