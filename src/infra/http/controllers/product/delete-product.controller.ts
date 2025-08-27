import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Delete,
  Param,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { DeleteProductUseCase } from 'src/domain/our-city/application/use-cases/product/delete-product';

@Controller('/delete-product/:id')
export class DeleteProductController {
  constructor(private readonly deleteProductUseCase: DeleteProductUseCase) {}

  @Delete()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      const result = await this.deleteProductUseCase.execute({
        productId: id,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case BadRequestException:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return { message: 'Produto deletado.' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
