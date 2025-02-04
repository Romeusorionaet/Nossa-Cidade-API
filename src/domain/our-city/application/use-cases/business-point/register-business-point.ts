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
  location: GeometryPoint;
  status: BusinessPointStatus;
  openingHours: string;
  censorship: boolean;
}

type RegisterBusinessPointUseCaseResponse = Either<null, object>;

@Injectable()
export class RegisterBusinessPointUseCase {
  constructor(private businessPointRepository: BusinessPointRepository) {}

  async execute({
    categoryId,
    ownerId,
    name,
    location,
    status,
    openingHours,
    censorship,
  }: RegisterBusinessPointUseCaseRequest): Promise<RegisterBusinessPointUseCaseResponse> {
    const businessPoint = BusinessPoint.create({
      categoryId: new UniqueEntityID(categoryId),
      ownerId: new UniqueEntityID(ownerId),
      name,
      location,
      status,
      openingHours: JSON.parse(openingHours),
      censorship,
    });

    await this.businessPointRepository.create(businessPoint);

    return right({});
  }
}
