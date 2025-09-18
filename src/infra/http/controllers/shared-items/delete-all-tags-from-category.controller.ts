import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Param,
  Delete,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { DeleteAllTagsFromCategoryUseCase } from 'src/domain/our-city/application/use-cases/shared-items/delete-all-tags-from-category';

@Controller('/category-tags/delete-all/:id')
export class DeleteAllTagsFromCategoryController {
  constructor(
    private readonly deleteAllTagsFromCategoryUseCase: DeleteAllTagsFromCategoryUseCase,
  ) {}

  @Delete()
  @UseGuards(AccessTokenGuard)
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    try {
      const result = await this.deleteAllTagsFromCategoryUseCase.execute({
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
