import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { GetBusinessPointsForMappingUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-points-for-mapping';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { BusinessPointForMappingPresenter } from '../../presenters/business-point-for-mapping.presenter';

@Controller('/business-point/get-all-for-mapping')
export class GetBusinessPointsForMappingController {
  constructor(
    private getBusinessPointsForMappingUseCase: GetBusinessPointsForMappingUseCase,
  ) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle() {
    try {
      const businessPoints =
        await this.getBusinessPointsForMappingUseCase.execute();

      return businessPoints.value.businessPoints.map(
        BusinessPointForMappingPresenter.toHTTP,
      );
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
