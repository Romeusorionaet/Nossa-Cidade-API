import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Body,
  Post,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import {
  productRequest,
  productSchemaValidationPipe,
} from '../../schemas/product.schema';
import { RegisterProductPointUseCase } from 'src/domain/our-city/application/use-cases/product/register-product';

@Controller('/register/product')
export class RegisterProductController {
  constructor(
    private readonly registerProductUseCase: RegisterProductPointUseCase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(201)
  async handle(@Body(productSchemaValidationPipe) body: productRequest) {
    try {
      const product = body;

      await this.registerProductUseCase.execute({
        businessPointId: product.businessPointId,
        categoryId: product.categoryId,
        customTags: product.customTags,
        price: Number(product.price),
        title: product.title,
      });

      return {
        message: 'Produto registrado.',
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
