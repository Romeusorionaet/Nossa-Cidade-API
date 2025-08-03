import { Product } from 'src/domain/our-city/enterprise/entities/product';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductCustomTagRepository } from '../../repositories/product-custom-tag.repository';

interface RegisterProductPointUseCaseRequest {
  categoryId: string;
  businessPointId: string;
  title: string;
  price: number;
  customTags: string[];
}

type RegisterProductPointUseCaseResponse = Either<null, object>;

@Injectable()
export class RegisterProductPointUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCustomTag: ProductCustomTagRepository,
  ) {}

  async execute({
    categoryId,
    businessPointId,
    title,
    price,
    customTags,
  }: RegisterProductPointUseCaseRequest): Promise<RegisterProductPointUseCaseResponse> {
    const product = Product.create({
      categoryId: new UniqueEntityID(categoryId),
      businessPointId: new UniqueEntityID(businessPointId),
      title,
      price,
    });

    await this.productRepository.create(product);

    if (customTags.length > 0) {
      await this.productCustomTag.create({
        customTags,
        productId: product.id.toString(),
      });
    }
    return right({});
  }
}
