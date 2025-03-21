import { BusinessPointImage } from 'src/domain/our-city/enterprise/entities/business-point-image';
import { BusinessPointRepository } from '../../repositories/business-point.repository';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface SaveImagesBusinessPointImageUseCaseRequest {
  businessPointId: string;
  imgUrls: string[];
}

type SaveImagesBusinessPointImageUseCaseResponse = Either<null, object>;

@Injectable()
export class SaveImagesBusinessPointImageUseCase {
  constructor(private businessPointRepository: BusinessPointRepository) {}

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

    await this.businessPointRepository.saveImageUrls(businessPointImages);

    return right({});
  }
}
