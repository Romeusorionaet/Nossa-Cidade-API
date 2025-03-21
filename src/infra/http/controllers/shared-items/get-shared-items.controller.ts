import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { GetSharedItemsUseCase } from 'src/domain/our-city/application/use-cases/shared-items/get-shared-items';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';

@Controller('/pick-list/shared-items')
export class SharedItemsController {
  constructor(private readonly getSharedItemsUseCase: GetSharedItemsUseCase) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle() {
    try {
      const result = await this.getSharedItemsUseCase.execute();

      return result.value.sharedItems;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
