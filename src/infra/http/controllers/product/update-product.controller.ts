import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Body,
  Put,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { UpdateProductUseCase } from 'src/domain/our-city/application/use-cases/product/update-product';
import {
  updateProductRequest,
  updateProductSchemaValidationPipe,
} from '../../schemas/update-product.schema';

@Controller('/update-product')
export class UpdateProductController {
  constructor(private readonly updateProductUseCase: UpdateProductUseCase) {}

  @Put()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(
    @Body(updateProductSchemaValidationPipe)
    body: updateProductRequest,
  ) {
    try {
      const data = body;

      const result = await this.updateProductUseCase.execute({
        businessPointId: data.businessPointId,
        id: data.id,
        price: data.price,
        title: data.title,
      });

      if (result.isLeft()) {
        throw new BadRequestException(result.value.message);
      }

      return { message: 'Produto atualizado.' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
