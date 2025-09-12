import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { SharedItemsRepository } from '../../repositories/shared-items.repository';
import { SharedItem } from 'src/domain/our-city/enterprise/entities/shared-item';
import { SharedItemsRequestType } from 'src/core/@types/shared-items-request-type';
import { SharedItemsType } from 'src/core/@types/shared-items-type';

type RegisterSharedItemsUseCaseRequest = {
  data: Partial<SharedItemsRequestType>;
};

type RegisterSharedItemsUseCaseResponse = Either<null, object>;

@Injectable()
export class RegisterSharedItemsUseCase {
  constructor(private readonly sharedItemsRepository: SharedItemsRepository) {}

  async execute({
    data,
  }: RegisterSharedItemsUseCaseRequest): Promise<RegisterSharedItemsUseCaseResponse> {
    const sharedItems = Object.keys(data).reduce((acc, key) => {
      const items = data[key as keyof SharedItemsType];
      if (!items || items.length === 0) return acc;

      acc[key as keyof SharedItemsType] = items.map((item) =>
        SharedItem.create({
          name: item.name,
        }),
      );

      return acc;
    }, {} as SharedItemsType);

    await this.sharedItemsRepository.create(sharedItems);

    return right({});
  }
}
