import {
  BadRequestException,
  Controller,
  HttpCode,
  Get,
  Param,
} from '@nestjs/common';
import { Public } from '../../middlewares/auth/decorators/public.decorator';
import { GetProductsUseCase } from 'src/domain/our-city/application/use-cases/product/get-products';
import { ProductPresenter } from '../../presenters/product.presenter';

@Controller('/products/:page')
export class GetProductsController {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  @Get()
  @Public()
  @HttpCode(200)
  async handle(@Param('page') page: number) {
    try {
      const result = await this.getProductsUseCase.execute({ page });

      return result.value.productsWithImageUrls.map(ProductPresenter.toHTTP);
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
