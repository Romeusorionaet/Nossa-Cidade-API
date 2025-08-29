import { Product } from 'src/domain/our-city/enterprise/entities/product';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductCustomTagRepository } from '../../repositories/product-custom-tag.repository';
import { CustomTag } from 'src/domain/our-city/enterprise/value-objects/custom-tag';

interface RegisterProductUseCaseRequest {
  businessPointId: string;
  businessPointName: string;
  title: string;
  price: number;
  customTags: string[];
}

type RegisterProductUseCaseResponse = Either<
  null,
  { productId: UniqueEntityID }
>;

@Injectable()
export class RegisterProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCustomTag: ProductCustomTagRepository,
  ) {}

  async execute({
    businessPointId,
    businessPointName,
    title,
    price,
    customTags,
  }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {
    const product = Product.create({
      businessPointId: new UniqueEntityID(businessPointId),
      businessPointName,
      title,
      price,
    });

    await this.productRepository.create(product);

    if (customTags.length > 0) {
      const tags = customTags.map((t) => CustomTag.create(t));

      await this.productCustomTag.create({
        customTags: tags,
        productId: product.id.toString(),
      });
    }
    return right({ productId: product.id });
  }
}
