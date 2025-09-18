import { ImageBusinessPointRepository } from '../../repositories/image-business-point.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

type GetBusinessPointImagesUseCaseRequest = {
  businessPointId: string;
};

type GetBusinessPointImagesUseCaseResponse = Either<
  null,
  {
    businessPointImages: BusinessPointImageType[];
  }
>;

@Injectable()
export class GetBusinessPointImagesUseCase {
  constructor(
    private readonly imageBusinessPointRepository: ImageBusinessPointRepository,
  ) {}

  async execute({
    businessPointId,
  }: GetBusinessPointImagesUseCaseRequest): Promise<GetBusinessPointImagesUseCaseResponse> {
    const businessPointImages =
      await this.imageBusinessPointRepository.findImageUrlsByBusinessPointId(
        businessPointId,
      );

    return right({ businessPointImages });
  }
}
