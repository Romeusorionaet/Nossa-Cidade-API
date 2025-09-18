import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { CategoryTagsRepository } from '../../repositories/category-tags.repository';
import { CategoryTagNotFoundError } from '../errors/category-tag-not-found-error';

interface DeleteCategoryTagUseCaseRequest {
  categoryId: string;
}

type DeleteCategoryTagUseCaseResponse = Either<
  CategoryTagNotFoundError,
  object
>;

@Injectable()
export class DeleteCategoryTagUseCase {
  constructor(
    private readonly categoryTagsRepository: CategoryTagsRepository,
  ) {}

  async execute({
    categoryId,
  }: DeleteCategoryTagUseCaseRequest): Promise<DeleteCategoryTagUseCaseResponse> {
    const existCategory =
      await this.categoryTagsRepository.findById(categoryId);

    if (!existCategory) {
      return left(new CategoryTagNotFoundError());
    }

    await this.categoryTagsRepository.delete(categoryId);

    return right({});
  }
}
