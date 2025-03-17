import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { GetBusinessPointPreviewUserUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-preview-user';
import { CurrentUser } from '../../middlewares/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';

@Controller('/business-point/preview/user')
export class GetBusinessPointPreviewUserController {
  constructor(
    private getBusinessPointPreviewUserUseCase: GetBusinessPointPreviewUserUseCase,
  ) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@CurrentUser() user: AccessTokenPayload) {
    try {
      const { sub: id } = user;

      const result = await this.getBusinessPointPreviewUserUseCase.execute({
        id,
      });

      return result.value.businessPointsPreview;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
