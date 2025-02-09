import { GetBusinessPointsForMappingUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-points-for-mapping';
import { BusinessPointForMappingPresenter } from '../../presenters/business-point-for-mapping.presenter';
import { BadRequestException, Controller, HttpCode, Get } from '@nestjs/common';
import { Public } from '../../middlewares/auth/decorators/public.decorator';

@Controller('/business-point/get-all-for-mapping')
export class GetBusinessPointsForMappingController {
  constructor(
    private getBusinessPointsForMappingUseCase: GetBusinessPointsForMappingUseCase,
  ) {}

  @Get()
  @Public()
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
