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

@Controller('/pick-list/shared-items/associated/business-point/:id')
export class SharedItemsAssociatedBusinessPointController {
  constructor(
    private getSharedItemsAssociatedBusinessPointUseCase: GetSharedItemsAssociatedBusinessPointUseCase,
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

      return result.value.sharedItemsAssociated;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
