import { SharedItemRepository } from '../../repositories/shared-item.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { GetSharedItemsType } from 'src/core/@types/get-shared-items-type';

type GetSharedItemsUseCaseResponse = Either<
  null,
  {
    sharedItems: GetSharedItemsType;
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
