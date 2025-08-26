import { BusinessPointImageLimitExceededError } from '../errors/business-point-image-limit-exceeded-error';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { ProductImageQuota } from '../../shared/constants/product-image-quota';
import { ProductImageLimitExceededError } from '../errors/product-image-limit-exceeded-error';
import { ImageProductRepository } from '../../repositories/image-product.repository';

interface CheckProductImageQuotaUseCaseRequest {
  productId: string;
}

type CheckProductImageQuotaUseCaseResponse = Either<
  BusinessPointImageLimitExceededError,
  object
>;

@Injectable()
export class CheckProductImageQuotaUseCase {
  constructor(
    private readonly imageProductRepository: ImageProductRepository,
  ) {}

  async execute({
    productId,
  }: CheckProductImageQuotaUseCaseRequest): Promise<CheckProductImageQuotaUseCaseResponse> {
    const currentQuota =
      await this.imageProductRepository.checkQuotaById(productId);

    if (currentQuota >= ProductImageQuota) {
      return left(new ProductImageLimitExceededError());
    }

    return right({});
  }
}
