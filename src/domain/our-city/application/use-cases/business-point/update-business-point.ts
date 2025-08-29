import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { BusinessPointDraftRepository } from '../../repositories/business-point-draft.repository';
import { BusinessPointNotFoundError } from '../errors/business-point-not-found-error';
import { BusinessPointDraftNotFoundError } from '../errors/business-point-draft-not-found-error';

type UpdateBusinessPointUseCaseRequest = {
  businessPointId: string;
};

type UpdateBusinessPointUseCaseResponse = Either<
  BusinessPointNotFoundError | BusinessPointDraftNotFoundError,
  object
>;

@Injectable()
export class UpdateBusinessPointUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
    private readonly businessPointDraftRepository: BusinessPointDraftRepository,
  ) {}

  async execute({
    businessPointId,
  }: UpdateBusinessPointUseCaseRequest): Promise<UpdateBusinessPointUseCaseResponse> {
    const businessPointDraft =
      await this.businessPointDraftRepository.findByBusinessPointId(
        businessPointId,
      );

    if (!businessPointDraft) {
      return left(new BusinessPointDraftNotFoundError());
    }

    const businessPoint =
      await this.businessPointRepository.findById(businessPointId);

    if (!businessPoint) {
      return left(new BusinessPointNotFoundError());
    }

    const businessPointUpdated = businessPoint.update({
      name: businessPointDraft?.name ?? businessPoint.name,
      location: businessPointDraft?.location ?? businessPoint.location,
      openingHours:
        businessPointDraft?.openingHours ?? businessPoint.openingHours,
      censorship: businessPointDraft?.censorship ?? businessPoint.censorship,
      neighborhood:
        businessPointDraft?.neighborhood ?? businessPoint.neighborhood,
      street: businessPointDraft?.street ?? businessPoint.street,
      houseNumber: businessPointDraft?.houseNumber ?? businessPoint.houseNumber,
      description: businessPointDraft?.description ?? businessPoint.description,
      website: businessPointDraft?.website ?? businessPoint.website,
      highlight: businessPointDraft?.highlight ?? businessPoint.highlight,
      status: businessPoint.status,
      awaitingApproval: businessPoint.awaitingApproval,
    });

    await this.businessPointRepository.update(businessPointUpdated);
    await this.businessPointDraftRepository.delete(
      businessPointDraft.id.toString(),
    );

    return right({});
  }
}
