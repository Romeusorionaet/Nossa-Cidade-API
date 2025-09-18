import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import {
  categoryTagsRequest,
  categoryTagsSchemaValidationPipe,
} from '../../schemas/category-tags.schema';
import { RegisterCategoryTagsUseCase } from 'src/domain/our-city/application/use-cases/shared-items/register-category-tags';

@Controller('/category-tags/register/:id')
export class RegisterCategoryTagsController {
  constructor(
    private readonly registerCategoryTagsUseCase: RegisterCategoryTagsUseCase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(201)
  async handle(
    @Param('id') id: string,
    @Body(categoryTagsSchemaValidationPipe) body: categoryTagsRequest,
  ) {
    try {
      const { categoryTags } = body;

      await this.registerCategoryTagsUseCase.execute({
        categoryTags,
        categoryId: id,
      });

      return {};
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
