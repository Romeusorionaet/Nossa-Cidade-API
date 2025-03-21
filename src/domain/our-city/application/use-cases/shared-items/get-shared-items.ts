import { SharedItemRepository } from '../../repositories/shared-item.repository';
import { SharedItemsType } from 'src/core/@types/get-shared-items-type';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

type GetSharedItemsUseCaseResponse = Either<
  null,
  {
    sharedItems: SharedItemsType;
  }
>;

@Injectable()
export class GetSharedItemsUseCase {
  constructor(private readonly sharedItemsRepository: SharedItemRepository) {}

  async execute(): Promise<GetSharedItemsUseCaseResponse> {
    const sharedItems = await this.sharedItemsRepository.findAll();

    return right({ sharedItems });
  }
}
