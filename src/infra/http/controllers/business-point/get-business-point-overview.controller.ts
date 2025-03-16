import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { GetBusinessPointOverviewUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-overview';
import { BusinessPointDetailsPresenter } from '../../presenters/business-point-details.presenter';
import { Public } from '../../middlewares/auth/decorators/public.decorator';

@Controller('/business-point/overview/:id')
export class GetBusinessPointOverviewController {
  constructor(
    private getBusinessPointOverviewUseCase: GetBusinessPointOverviewUseCase,
  ) {}

  @Public()
  @Get()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      const result = await this.getBusinessPointOverviewUseCase.execute({
        id,
      });

      return BusinessPointDetailsPresenter.toHTTP(result.value.businessPoint);
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
