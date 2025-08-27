import { BadRequestException, Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { ProductRepository } from '../../repositories/product.repository';

type DeleteProductUseCaseRequest = {
  productId: string;
};

type DeleteProductUseCaseResponse = Either<BadRequestException, object>;

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    productId,
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const { id } = await this.productRepository.findById(productId);

    if (!id) {
      return left(new BadRequestException('Product não encontrada.'));
    }

    await this.productRepository.delete(productId);

    return right({});
  }
}
