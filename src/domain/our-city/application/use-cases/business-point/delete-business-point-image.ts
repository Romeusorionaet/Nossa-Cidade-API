import { ImageBusinessPointRepository } from '../../repositories/image-business-point.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';

type DeleteBusinessPointImageUseCaseRequest = {
  urlId: string;
};

type DeleteBusinessPointImageUseCaseResponse = Either<
  BadRequestException,
  object
>;

@Injectable()
export class DeleteBusinessPointImageUseCase {
  constructor(
    private readonly imageBusinessPointRepository: ImageBusinessPointRepository,
  ) {}

  async execute({
    urlId,
  }: DeleteBusinessPointImageUseCaseRequest): Promise<DeleteBusinessPointImageUseCaseResponse> {
    const imageExists =
      await this.imageBusinessPointRepository.existsByUrlId(urlId);

    if (!imageExists) {
      return left(new BadRequestException('Image não encontrada.'));
    }

    await this.imageBusinessPointRepository.deleteByUrlId(urlId);

    return right({});
  }
}
