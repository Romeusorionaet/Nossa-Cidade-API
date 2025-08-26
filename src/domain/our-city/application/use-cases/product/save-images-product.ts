import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductImage } from 'src/domain/our-city/enterprise/entities/product-image';

interface SaveImagesProductUseCaseRequest {
  productId: string;
  imgUrls: string[];
}

type SaveImagesProductUseCaseResponse = Either<null, object>;

@Injectable()
export class SaveImagesProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    productId,
    imgUrls,
  }: SaveImagesProductUseCaseRequest): Promise<SaveImagesProductUseCaseResponse> {
    const productImages = imgUrls.map((url) =>
      ProductImage.create({
        productId: new UniqueEntityID(productId),
        url,
      }),
    );

    await this.productRepository.saveImageUrls(productImages);

    return right({});
  }
}
