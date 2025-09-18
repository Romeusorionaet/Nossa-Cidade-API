import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ImageProductRepository } from '../../repositories/image-product.repository';

interface GetProductsUseCaseRequest {
  page: number;
}

type GetProductsUseCaseResponse = Either<
  null,
  {
    productsWithImageUrls: ProductWithImagesType[];
  }
>;

@Injectable()
export class GetProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly imageProductRepository: ImageProductRepository,
  ) {}

  async execute({
    page,
  }: GetProductsUseCaseRequest): Promise<GetProductsUseCaseResponse> {
    const products = await this.productRepository.findMany({ page });

    const productIds = products.map((p) => p.id.toString());
    const imagesProduct =
      await this.imageProductRepository.findImageUrlsByProductIds(productIds);

    const productsWithImageUrls: ProductWithImagesType[] = products.map(
      (product) => ({
        id: product.id.toString(),
        businessPointId: product.businessPointId.toString(),
        businessPointName: product.businessPointName,
        title: product.title,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        imageUrls: imagesProduct
          .filter((img) => img.productId === product.id.toString())
          .map((img) => ({
            id: img.id,
            url: img.url,
            productId: img.productId,
          })),
      }),
    );

    return right({ productsWithImageUrls });
  }
}
