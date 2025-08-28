import { BusinessPointDraft } from 'src/domain/our-city/enterprise/entities/business-point-draft';
import { BusinessPointDraftRepository } from '../../repositories/business-point-draft.repository';
import { BusinessPointUnderAnalysisError } from '../errors/business-point-under-analysis-error';
import { DraftStatus } from 'src/domain/our-city/enterprise/entities/enums/draft-status';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { BusinessPointNotFoundError } from '../errors/business-point-not-found-error';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface UpdateBusinessPointUseCaseRequest {
  businessPointId: string;
  categoryId: string;
  name?: string;
  location?: GeometryPoint;
  openingHours?: Record<string, any>;
  description?: string;
  highlight?: string;
  website?: string;
  censorship?: boolean;
  neighborhood?: string;
  street?: string;
  houseNumber?: number;
}

type UpdateBusinessPointUseCaseResponse = Either<
  BusinessPointUnderAnalysisError | BusinessPointNotFoundError,
  object
>;

@Injectable()
export class UpdateBusinessPointUseCase {
  constructor(
    private readonly businessPointDraftRepository: BusinessPointDraftRepository,
    private readonly businessPointRepository: BusinessPointRepository,
  ) {}

  async execute({
    businessPointId,
    categoryId,
    name,
    location,
    openingHours,
    description,
    highlight,
    website,
    censorship,
    neighborhood,
    street,
    houseNumber,
  }: UpdateBusinessPointUseCaseRequest): Promise<UpdateBusinessPointUseCaseResponse> {
    const businessPoint =
      await this.businessPointRepository.findById(businessPointId);

    const existBusinessPointDraft =
      await this.businessPointDraftRepository.findByBusinessPointId(
        businessPointId,
      );

    if (!businessPoint) {
      return left(new BusinessPointNotFoundError(businessPoint.name));
    }

    if (existBusinessPointDraft) {
      return left(new BusinessPointUnderAnalysisError());
    }

    const businessPointDraft = BusinessPointDraft.create({
      categoryId: new UniqueEntityID(categoryId),
      businessPointId: businessPoint.id,
      name,
      location,
      openingHours: openingHours,
      description,
      highlight,
      website,
      censorship,
      status: DraftStatus.PENDENT,
      neighborhood,
      street,
      houseNumber,
    });

    await this.businessPointDraftRepository.create(businessPointDraft);

    return right({});
  }
}
