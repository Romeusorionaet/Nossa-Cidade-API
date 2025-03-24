import { ImageBusinessPointRepository } from '../../repositories/image-business-point.repository';
import { Either, right } from 'src/core/either';
import { BadRequestException, Injectable } from '@nestjs/common';

type DeleteBusinessPointImageUseCaseRequest = {
  urlId: string;
};

type DeleteBusinessPointImageUseCaseResponse = Either<null, object>;

@Injectable()
export class DeleteBusinessPointImageUseCase {
  constructor(
    private readonly imageBusinessPointRepository: ImageBusinessPointRepository,
  ) {}

  async execute({
    urlId,
  }: DeleteBusinessPointImageUseCaseRequest): Promise<DeleteBusinessPointImageUseCaseResponse> {
    await this.imageBusinessPointRepository.findImageUrlsById(urlId);

    await this.imageBusinessPointRepository.deleteByUrlId(urlId);

    return right({});
  }
}
