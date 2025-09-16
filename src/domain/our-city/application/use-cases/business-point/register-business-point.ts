import { BusinessPointCustomTagRepository } from '../../repositories/business-point-custom-tag.repository';
import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { BusinessPoint } from 'src/domain/our-city/enterprise/entities/business-point';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { SearchableText } from 'src/domain/our-city/enterprise/value-objects/searchable-text';

interface RegisterBusinessPointUseCaseRequest {
  categoryId: string;
  ownerId: string;
  name: string;
  customTags: string[];
  location: GeometryPoint;
  openingHours: Record<string, any>;
  description: string;
  highlight: string;
  neighborhood: string;
  street: string;
  houseNumber: number;
}

type RegisterBusinessPointUseCaseResponse = Either<null, object>;

@Injectable()
export class RegisterBusinessPointUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
    private readonly businessPointCustomTag: BusinessPointCustomTagRepository,
  ) {}

  async execute({
    categoryId,
    ownerId,
    name,
    customTags,
    location,
    openingHours,
    description,
    highlight,
    neighborhood,
    street,
    houseNumber,
  }: RegisterBusinessPointUseCaseRequest): Promise<RegisterBusinessPointUseCaseResponse> {
    const businessPoint = BusinessPoint.create({
      categoryId: new UniqueEntityID(categoryId),
      ownerId: new UniqueEntityID(ownerId),
      name,
      neighborhood,
      street,
      houseNumber,
      location,
      status: BusinessPointStatus.ACTIVE,
      openingHours: openingHours,
      censorship: false,
      description,
      highlight,
    });

    await this.businessPointRepository.create(businessPoint);

    if (customTags.length > 0) {
      const customTagsNormalized = customTags.map(
        (tag) => SearchableText.createFromText(tag).value,
      );

      await this.businessPointCustomTag.create({
        customTags: customTagsNormalized,
        businessPointId: businessPoint.id.toString(),
      });
    }

    return right({});
  }
}
