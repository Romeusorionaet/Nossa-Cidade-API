import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { CategoryTagsRepository } from '../../repositories/category-tags.repository';

interface GetAllTagsFromCategoryUseCaseRequest {
  categoryId: string;
}

type GetAllTagsFromCategoryUseCaseResponse = Either<
  null,
  { tags: CategoryTag[] }
>;

@Injectable()
export class GetAllTagsFromCategoryUseCase {
  constructor(
    private readonly categoryTagsRepository: CategoryTagsRepository,
  ) {}

  async execute({
    categoryId,
  }: GetAllTagsFromCategoryUseCaseRequest): Promise<GetAllTagsFromCategoryUseCaseResponse> {
    const tags =
      await this.categoryTagsRepository.findAllFromCategory(categoryId);

    return right({ tags });
  }
}
