import { UploadServiceRepository } from '../../repositories/services/upload/upload-service.repository';
import { UploadImageError } from '../errors/upload-image-error';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface UploadImageUseCaseRequest {
  files: Express.Multer.File[];
}

type UploadImageUseCaseResponse = Either<
  UploadImageError,
  {
    imageUrls: string[];
  }
>;

@Injectable()
export class UploadImageUseCase {
  constructor(private readonly uploadThingService: UploadServiceRepository) {}

  async execute({
    files,
  }: UploadImageUseCaseRequest): Promise<UploadImageUseCaseResponse> {
    const imageUrls = await this.uploadThingService.uploadImage(files);

    if (!imageUrls) {
      return left(new UploadImageError());
    }

    return right({ imageUrls });
  }
}
