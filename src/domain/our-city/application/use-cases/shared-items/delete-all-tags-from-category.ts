import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { CategoryTagsRepository } from '../../repositories/category-tags.repository';
import { SharedItemsRepository } from '../../repositories/shared-items.repository';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';

interface DeleteAllTagsFromCategoryUseCaseRequest {
  categoryId: string;
}

type DeleteAllTagsFromCategoryUseCaseResponse = Either<
  ResourceNotFoundError,
  object
>;

@Injectable()
export class DeleteAllTagsFromCategoryUseCase {
  constructor(
    private readonly categoryTagsRepository: CategoryTagsRepository,
    private readonly sharedItemsRepository: SharedItemsRepository,
  ) {}

  async execute({
    categoryId,
  }: DeleteAllTagsFromCategoryUseCaseRequest): Promise<DeleteAllTagsFromCategoryUseCaseResponse> {
    const existCategory =
      await this.sharedItemsRepository.findUnique(categoryId);

    if (!existCategory) {
      return left(new ResourceNotFoundError());
    }

    await this.categoryTagsRepository.deleteAllFromCategory(categoryId);

    return right({});
  }
}
