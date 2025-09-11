import { SharedItemsType } from 'src/core/@types/get-shared-items-type';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { SharedItemsRepository } from '../../repositories/shared-items.repository';

type GetSharedItemsUseCaseResponse = Either<
  null,
  {
    sharedItems: SharedItemsType;
  }
>;

@Injectable()
export class GetSharedItemsUseCase {
  constructor(private readonly sharedItemsRepository: SharedItemsRepository) {}

  async execute(): Promise<GetSharedItemsUseCaseResponse> {
    const sharedItems = await this.sharedItemsRepository.findAll();

    return right({ sharedItems });
  }
}
