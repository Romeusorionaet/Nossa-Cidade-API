import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductNotFoundError } from '../errors/product-not-found-error';

interface UpdateProductUseCaseRequest {
  id: string;
  businessPointId: string;
  title: string;
  price: string;
}

type UpdateProductUseCaseResponse = Either<ProductNotFoundError, object>;

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    id,
    businessPointId,
    price,
    title,
  }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return left(new ProductNotFoundError(title));
    }

    const productUpdated = product.update({
      businessPointId: new UniqueEntityID(businessPointId),
      price: Number(price),
      title,
    });

    await this.productRepository.update(productUpdated);

    return right({});
  }
}
