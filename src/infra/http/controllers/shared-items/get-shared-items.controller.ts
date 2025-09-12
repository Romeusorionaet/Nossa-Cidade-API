import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { GetSharedItemsUseCase } from 'src/domain/our-city/application/use-cases/shared-items/get-shared-items';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { SharedItemPresenter } from '../../presenters/shared-item.presenter';

@Controller('/pick-list/shared-items')
export class SharedItemsController {
  constructor(private readonly getSharedItemsUseCase: GetSharedItemsUseCase) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle() {
    try {
      const result = await this.getSharedItemsUseCase.execute();

      const formatted = Object.fromEntries(
        Object.entries(result.value.sharedItems).map(([key, items]) => [
          key,
          items.map(SharedItemPresenter.toHTTP),
        ]),
      );

      return formatted;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
