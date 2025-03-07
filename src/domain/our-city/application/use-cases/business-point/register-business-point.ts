import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { BusinessPoint } from 'src/domain/our-city/enterprise/entities/business-point';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface RegisterBusinessPointUseCaseRequest {
  categoryId: string;
  ownerId: string;
  name: string;
  address: string;
  location: GeometryPoint;
  openingHours: Record<string, any>;
}

type RegisterBusinessPointUseCaseResponse = Either<null, object>;

@Injectable()
export class RegisterBusinessPointUseCase {
  constructor(private businessPointRepository: BusinessPointRepository) {}

  async execute({
    categoryId,
    ownerId,
    name,
    address,
    location,
    openingHours,
  }: RegisterBusinessPointUseCaseRequest): Promise<RegisterBusinessPointUseCaseResponse> {
    const businessPoint = BusinessPoint.create({
      categoryId: new UniqueEntityID(categoryId),
      ownerId: new UniqueEntityID(ownerId),
      name,
      address,
      location,
      status: BusinessPointStatus.ACTIVE,
      openingHours: openingHours,
      censorship: false,
    });

    await this.businessPointRepository.create(businessPoint);

    return right({});
  }
}
