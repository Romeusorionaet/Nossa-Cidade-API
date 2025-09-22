import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Get,
  Param,
} from '@nestjs/common';
import { GetSharedItemsAssociatedBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/shared-items/get-shared-items-associated-business-point';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { SharedItemPresenter } from '../../presenters/shared-item.presenter';

@Controller('/pick-list/shared-items/associated/business-point/:id')
export class SharedItemsAssociatedBusinessPointController {
  constructor(
    private readonly getSharedItemsAssociatedBusinessPointUseCase: GetSharedItemsAssociatedBusinessPointUseCase,
  ) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      const result =
        await this.getSharedItemsAssociatedBusinessPointUseCase.execute({
          businessPointId: id,
        });

      if (result.isLeft()) {
        throw new BadRequestException(result.value.message);
      }

      const formatted = Object.fromEntries(
        Object.entries(result.value.sharedItemsAssociated).map(
          ([key, items]) => [key, items.map(SharedItemPresenter.toHTTP)],
        ),
      );

      return formatted;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
