import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ProductImageQuota } from '../../shared/constants/product-image-quota';
import { ProductImageLimitExceededError } from '../errors/product-image-limit-exceeded-error';
import { ImageProductRepository } from '../../repositories/image-product.repository';

interface CheckProductImageQuotaUseCaseRequest {
  productId: string;
  filesLength: number;
}

type CheckProductImageQuotaUseCaseResponse = Either<
  ProductImageLimitExceededError,
  object
>;

@Injectable()
export class CheckProductImageQuotaUseCase {
  constructor(
    private readonly imageProductRepository: ImageProductRepository,
  ) {}

  async execute({
    productId,
    filesLength,
  }: CheckProductImageQuotaUseCaseRequest): Promise<CheckProductImageQuotaUseCaseResponse> {
    const currentQuota =
      await this.imageProductRepository.checkQuotaById(productId);

    const isLimitExceeded =
      Number(currentQuota) + Number(filesLength) > ProductImageQuota;

    if (isLimitExceeded) {
      return left(new ProductImageLimitExceededError());
    }

    return right({});
  }
}
