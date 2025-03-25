import { BusinessPointCustomTagRepository } from '../../repositories/business-point-custom-tag.repository';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { BusinessPointNotFoundError } from '../errors/business-point-not-found-error';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface UpdateBusinessPointUseCaseRequest {
  businessPointId: string;
  categoryId?: string;
  name?: string;
  address?: string;
  customTags?: string[];
  location?: GeometryPoint;
  openingHours?: Record<string, any>;
  description?: string;
  highlight?: string;
  categoriesAssociate?: string[];
  website?: string;
  censorship?: boolean;
}

type UpdateBusinessPointUseCaseResponse = Either<
  BusinessPointNotFoundError,
  object
>;

@Injectable()
export class UpdateBusinessPointUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
    private readonly businessPointCustomTag: BusinessPointCustomTagRepository,
  ) {}

  async execute({
    businessPointId,
    categoryId,
    name,
    address,
    customTags, //TODO make another controller to update these missing data
    location,
    openingHours,
    description,
    highlight,
    categoriesAssociate,
    website,
    censorship,
  }: UpdateBusinessPointUseCaseRequest): Promise<UpdateBusinessPointUseCaseResponse> {
    const businessPoint =
      await this.businessPointRepository.findById(businessPointId);

    if (!businessPoint) {
      return left(new BusinessPointNotFoundError(businessPoint.name));
    }

    const businessPointUpdated = businessPoint.update({
      categoryId: categoryId ? new UniqueEntityID(categoryId) : undefined,
      name,
      location,
      address,
      openingHours: openingHours,
      description,
      highlight,
      website,
      censorship,
    });

    await this.businessPointRepository.update(
      businessPointId,
      businessPointUpdated,
    );

    return right({});
  }
}
