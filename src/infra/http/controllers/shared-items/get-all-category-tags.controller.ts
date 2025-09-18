import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { GetAllTagsFromCategoryUseCase } from 'src/domain/our-city/application/use-cases/shared-items/get-all-tags-from-category';

@Controller('/category-tags/find-all/:id')
export class GetAllTagsFromCategoryController {
  constructor(
    private readonly deleteCategoryTagUseCase: GetAllTagsFromCategoryUseCase,
  ) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      const result = await this.deleteCategoryTagUseCase.execute({
        categoryId: id,
      });

      return { categoryTags: result.value.tags };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
