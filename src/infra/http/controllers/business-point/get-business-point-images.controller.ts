import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { GetBusinessPointImagesUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-images';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';

@Controller('/business-point/images/:id')
export class GetBusinessPointImagesController {
  constructor(
    private readonly getBusinessPointImagesUseCase: GetBusinessPointImagesUseCase,
  ) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      const result = await this.getBusinessPointImagesUseCase.execute({
        businessPointId: id,
      });

      return result.value.businessPointImages;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
