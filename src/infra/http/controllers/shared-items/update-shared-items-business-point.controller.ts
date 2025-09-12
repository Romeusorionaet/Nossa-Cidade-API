import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Body,
  Patch,
} from '@nestjs/common';
import {
  businessPointDetailsSchemaValidationPipe,
  businessPointDetailsRequest,
} from '../../schemas/business-point-details.schema';
import { UpdateSharedItemsBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/shared-items/update-shared-items-business-point';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';

@Controller('/shared-items/associated/update-details')
export class UpdateSharedItemsBusinessPointController {
  constructor(
    private readonly updateSharedItemsBusinessPointUseCase: UpdateSharedItemsBusinessPointUseCase,
  ) {}

  @Patch()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(
    @Body(businessPointDetailsSchemaValidationPipe)
    body: businessPointDetailsRequest,
  ) {
    try {
      const { businessPointId, newListItems, removedListItems } = body;

      await this.updateSharedItemsBusinessPointUseCase.execute({
        businessPointId,
        removedListItems,
        newListItems,
      });

      return { message: 'Alteração salvo.' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
