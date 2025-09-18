import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Param,
  Delete,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { DeleteCategoryTagUseCase } from 'src/domain/our-city/application/use-cases/shared-items/delete-category-tag';

@Controller('/category-tag/delete/:id')
export class DeleteCategoryTagController {
  constructor(
    private readonly deleteCategoryTagUseCase: DeleteCategoryTagUseCase,
  ) {}

  @Delete()
  @UseGuards(AccessTokenGuard)
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    try {
      const result = await this.deleteCategoryTagUseCase.execute({
        categoryId: id,
      });

      if (result.isLeft()) {
        throw new Error(result.value.message);
      }

      return {};
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
