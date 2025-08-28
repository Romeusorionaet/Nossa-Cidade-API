import { BadRequestException, Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { ImageProductRepository } from '../../repositories/image-product.repository';

type DeleteProductImageUseCaseRequest = {
  urlId: string;
};

type DeleteProductImageUseCaseResponse = Either<BadRequestException, object>;

@Injectable()
export class DeleteProductImageUseCase {
  constructor(
    private readonly imageProductRepository: ImageProductRepository,
  ) {}

  async execute({
    urlId,
  }: DeleteProductImageUseCaseRequest): Promise<DeleteProductImageUseCaseResponse> {
    const imageExists = await this.imageProductRepository.existsByUrlId(urlId);

    if (!imageExists) {
      return left(new BadRequestException('Image não encontrada.'));
    }

    await this.imageProductRepository.deleteByUrlId(urlId);

    return right({});
  }
}
