import { SharedItemsType } from 'src/core/@types/get-shared-items-type';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { SharedAssociationRepository } from '../../repositories/shared-association.repository';

type GetSharedItemsUseCaseResponse = Either<
  null,
  {
    sharedItems: SharedItemsType;
  }
>;

@Injectable()
export class GetSharedItemsUseCase {
  constructor(
    private readonly sharedItemsRepository: SharedAssociationRepository,
  ) {}

  async execute(): Promise<GetSharedItemsUseCaseResponse> {
    const sharedItems = await this.sharedItemsRepository.findAll();

    return right({ sharedItems });
  }
}
