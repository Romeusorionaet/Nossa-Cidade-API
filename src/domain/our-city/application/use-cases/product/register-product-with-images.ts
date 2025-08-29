import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { RegisterProductUseCase } from './register-product';
import { SaveImagesProductUseCase } from './save-images-product';
import { UploadImageUseCase } from '../upload/upload-image';
import { UploadImageError } from '../errors/upload-image-error';
import { ProductRepository } from '../../repositories/product.repository';

interface RegisterProductWithImagesUseCaseRequest {
  businessPointId: string;
  businessPointName: string;
  title: string;
  price: number;
  customTags: string[];
  files: Express.Multer.File[];
}

type RegisterProductWithImagesUseCaseResponse = Either<
  UploadImageError,
  object
>;

@Injectable()
export class RegisterProductWithImagesUseCase {
  constructor(
    private registerProductUseCase: RegisterProductUseCase,
    private saveImagesProductUseCase: SaveImagesProductUseCase,
    private uploadImageUseCase: UploadImageUseCase,
    private productRepository: ProductRepository,
  ) {}

  async execute({
    businessPointId,
    businessPointName,
    title,
    price,
    customTags,
    files,
  }: RegisterProductWithImagesUseCaseRequest): Promise<RegisterProductWithImagesUseCaseResponse> {
    const result = await this.registerProductUseCase.execute({
      businessPointId,
      businessPointName,
      customTags,
      price,
      title,
    });

    if (result.isRight()) {
      const resultUpload = await this.uploadImageUseCase.execute({ files });

      if (resultUpload.isLeft()) {
        await this.productRepository.delete(result.value.productId.toString());

        return left(new UploadImageError());
      }

      await this.saveImagesProductUseCase.execute({
        imgUrls: resultUpload.value.imageUrls,
        productId: result.value.productId.toString(),
      });
    }

    return right({});
  }
}
