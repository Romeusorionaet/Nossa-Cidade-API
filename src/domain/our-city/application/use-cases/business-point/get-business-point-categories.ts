import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { SharedBusinessPointCategoriesSelectModelType } from 'src/infra/database/schemas';

type GetBusinessPointCategoriesUseCaseResponse = Either<
  null,
  {
    businessPointCategories: SharedBusinessPointCategoriesSelectModelType[];
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
