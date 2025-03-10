import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { GetBusinessPointDetailsUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-details';
import { Public } from '../../middlewares/auth/decorators/public.decorator';

@Controller('/business-point/details/:id')
export class GetBusinessPointDetailsController {
  constructor(
    private getBusinessPointDetailsUseCase: GetBusinessPointDetailsUseCase,
  ) {}

  @Public()
  @Get()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      const result = await this.getBusinessPointDetailsUseCase.execute({
        id,
      });

      return result.value.businessPointDetails;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
