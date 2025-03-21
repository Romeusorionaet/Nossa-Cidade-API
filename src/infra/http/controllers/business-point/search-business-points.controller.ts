import { BusinessPointForMappingPresenter } from '../../presenters/business-point-for-mapping.presenter';
import {
  BadRequestException,
  Controller,
  HttpCode,
  Get,
  Param,
} from '@nestjs/common';
import { Public } from '../../middlewares/auth/decorators/public.decorator';
import { SearchBusinessPointsUseCase } from 'src/domain/our-city/application/use-cases/business-point/search-business-points';

@Controller('/business-point/search/:query')
export class SearchBusinessPointsController {
  constructor(
    private readonly searchBusinessPointsUseCase: SearchBusinessPointsUseCase,
  ) {}

  @Get()
  @Public()
  @HttpCode(200)
  async handle(@Param('query') query: string) {
    try {
      const businessPoints = await this.searchBusinessPointsUseCase.execute({
        query,
      });

      return businessPoints.value.businessPoints.map(
        BusinessPointForMappingPresenter.toHTTP,
      );
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
