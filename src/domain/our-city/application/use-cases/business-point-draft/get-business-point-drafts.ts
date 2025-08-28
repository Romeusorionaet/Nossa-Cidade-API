import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { BusinessPointDraftRepository } from '../../repositories/business-point-draft.repository';
import { BusinessPointDraft } from 'src/domain/our-city/enterprise/entities/business-point-draft';

type GetBusinessPointDraftsUseCaseRequest = {
  page: number;
};

type GetBusinessPointDraftsUseCaseResponse = Either<
  null,
  {
    businessPointDrafts: BusinessPointDraft[];
  }
>;

@Injectable()
export class GetBusinessPointDraftsUseCase {
  constructor(
    private readonly businessPointDraftRepository: BusinessPointDraftRepository,
  ) {}

  async execute({
    page,
  }: GetBusinessPointDraftsUseCaseRequest): Promise<GetBusinessPointDraftsUseCaseResponse> {
    const businessPointDrafts =
      await this.businessPointDraftRepository.findMany({ page });

    return right({ businessPointDrafts });
  }
}
