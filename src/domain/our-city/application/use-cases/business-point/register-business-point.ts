import { BusinessPointCustomTagRepository } from '../../repositories/business-point-custom-tag.repository';
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
  customTags: string[];
  location: GeometryPoint;
  openingHours: Record<string, any>;
  description: string;
  highlight: string;
}

type RegisterBusinessPointUseCaseResponse = Either<null, object>;

@Injectable()
export class RegisterBusinessPointUseCase {
  constructor(
    private businessPointRepository: BusinessPointRepository,
    private businessPointCustomTag: BusinessPointCustomTagRepository,
  ) {}

  async execute({
    categoryId,
    ownerId,
    name,
    address,
    customTags,
    location,
    openingHours,
    description,
    highlight,
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
      description,
      highlight,
    });

    await this.businessPointRepository.create(businessPoint);

    if (customTags.length > 0) {
      await this.businessPointCustomTag.create({
        customTags,
        businessPointId: businessPoint.id.toString(),
      });
    }
    return right({});
  }
}
