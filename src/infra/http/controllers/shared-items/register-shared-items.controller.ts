import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { RegisterSharedItemsUseCase } from 'src/domain/our-city/application/use-cases/shared-items/register-shared-items';
import {
  SharedItemsRequest,
  sharedItemsSchemaValidationPipe,
} from '../../schemas/shared-items.schema';
import { SharedItemsRequestType } from 'src/core/@types/shared-items-request-type';

@Controller('/shared-items/register')
export class RegisterSharedItemsController {
  constructor(
    private readonly registerSharedItemsUseCase: RegisterSharedItemsUseCase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(201)
  async handle(
    @Body(sharedItemsSchemaValidationPipe) body: SharedItemsRequest,
  ) {
    try {
      const data: Partial<SharedItemsRequestType> = body;

      await this.registerSharedItemsUseCase.execute({ data });

      return {};
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
