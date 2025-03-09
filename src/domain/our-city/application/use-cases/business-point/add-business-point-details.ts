import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface AddBusinessPointDetailsUseCaseRequest {
  businessPointId: string;
  pets: string[];
  planning: string[];
  accessibility: string[];
  parking: string[];
  payments: string[];
  audience: string[];
  amenities: string[];
  menu: string[];
  serviceOptions: string[];
  environments: string[];
}

type AddBusinessPointDetailsUseCaseResponse = Either<null, object>;

@Injectable()
export class AddBusinessPointDetailsUseCase {
  constructor(private businessPointRepository: BusinessPointRepository) {}

  async execute({
    businessPointId,
    accessibility,
    amenities,
    audience,
    menu,
    parking,
    payments,
    pets,
    planning,
    serviceOptions,
    environments,
  }: AddBusinessPointDetailsUseCaseRequest): Promise<AddBusinessPointDetailsUseCaseResponse> {
    await this.businessPointRepository.addDetails({
      businessPointId,
      accessibility,
      amenities,
      audience,
      menu,
      parking,
      payments,
      pets,
      planning,
      serviceOptions,
      environments,
    });

    return right({});
  }
}
