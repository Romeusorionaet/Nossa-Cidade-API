import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ProductImage } from 'src/domain/our-city/enterprise/entities/product-image';
import { ImageProductRepository } from '../../repositories/image-product.repository';

interface SaveImagesProductUseCaseRequest {
  productId: string;
  imgUrls: string[];
}

type SaveImagesProductUseCaseResponse = Either<null, object>;

@Injectable()
export class SaveImagesProductUseCase {
  constructor(
    private readonly imageProductRepository: ImageProductRepository,
  ) {}

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

    await this.imageProductRepository.saveImageUrls(productImages);

    return right({});
  }
}
