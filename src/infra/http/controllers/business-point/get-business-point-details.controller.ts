import { GetBusinessPointDetailsUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-details';
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { Public } from '../../middlewares/auth/decorators/public.decorator';
import { BusinessPointDetailsPresenter } from '../../presenters/business-point-details.presenter';

@Controller('/business-point/details/:id')
export class GetBusinessPointDetailsController {
  constructor(
    private getBusinessPointDetailsUseCase: GetBusinessPointDetailsUseCase,
  ) {}

  @Get()
  @Public()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      const resultBusinessPoint =
        await this.getBusinessPointDetailsUseCase.execute({
          id,
        });

      return BusinessPointDetailsPresenter.toHTTP(
        resultBusinessPoint.value.businessPoint,
      );
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
