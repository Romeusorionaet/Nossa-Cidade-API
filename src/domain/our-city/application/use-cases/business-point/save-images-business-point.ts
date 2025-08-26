import { BusinessPointImage } from 'src/domain/our-city/enterprise/entities/business-point-image';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ImageBusinessPointRepository } from '../../repositories/image-business-point.repository';

interface SaveImagesBusinessPointImageUseCaseRequest {
  businessPointId: string;
  imgUrls: string[];
}

type SaveImagesBusinessPointImageUseCaseResponse = Either<null, object>;

@Injectable()
export class SaveImagesBusinessPointUseCase {
  constructor(
    private readonly imageBusinessPointRepository: ImageBusinessPointRepository,
  ) {}

  async execute({
    businessPointId,
    imgUrls,
  }: SaveImagesBusinessPointImageUseCaseRequest): Promise<SaveImagesBusinessPointImageUseCaseResponse> {
    const businessPointImages = imgUrls.map((url) =>
      BusinessPointImage.create({
        businessPointId: new UniqueEntityID(businessPointId),
        url,
      }),
    );

    await this.imageBusinessPointRepository.saveImageUrls(businessPointImages);

    return right({});
  }
}
