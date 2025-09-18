import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { CustomTag } from 'src/domain/our-city/enterprise/value-objects/custom-tag';
import { CategoryTagsRepository } from '../../repositories/category-tags.repository';
import { SearchableText } from 'src/domain/our-city/enterprise/value-objects/searchable-text';

interface RegisterCategoryTagsUseCaseRequest {
  categoryId: string;
  categoryTags: string[];
}

type RegisterCategoryTagsUseCaseResponse = Either<null, object>;

@Injectable()
export class RegisterCategoryTagsUseCase {
  constructor(
    private readonly categoryTagsRepository: CategoryTagsRepository,
  ) {}

  async execute({
    categoryId,
    categoryTags,
  }: RegisterCategoryTagsUseCaseRequest): Promise<RegisterCategoryTagsUseCaseResponse> {
    const normalizedTags = categoryTags.map((t) => {
      const tag = CustomTag.create(t);
      return SearchableText.createFromText(tag.getValue());
    });

    await this.categoryTagsRepository.create({
      categoryId,
      categoryTags: normalizedTags,
    });

    return right({});
  }
}
