import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Delete,
  Param,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { DeleteProductImageUseCase } from 'src/domain/our-city/application/use-cases/product/delete-product-image';

@Controller('/product/delete-image/:id')
export class DeleteProductImageController {
  constructor(
    private readonly deleteProductImageUseCase: DeleteProductImageUseCase,
  ) {}

  @Delete()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      const result = await this.deleteProductImageUseCase.execute({
        urlId: id,
      });

      if (result.isLeft()) {
        throw new BadRequestException(result.value.message);
      }

      return { message: 'A imagem foi deletado.' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
