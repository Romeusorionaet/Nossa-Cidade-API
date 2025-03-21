import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { SharedBusinessPointCategoriesType } from 'src/infra/database/schemas';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

type GetBusinessPointCategoriesUseCaseResponse = Either<
  null,
  {
    businessPointCategories: SharedBusinessPointCategoriesType[];
  }
>;

@Injectable()
export class GetBusinessPointCategoriesUseCase {
  constructor(
    private readonly businessPointRepository: BusinessPointRepository,
  ) {}

  async execute(): Promise<GetBusinessPointCategoriesUseCaseResponse> {
    const businessPointCategories =
      await this.businessPointRepository.findAllCategories();

    return right({ businessPointCategories });
  }
}
