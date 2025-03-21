import { GetBusinessPointCategoriesUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-categories';
import { BadRequestException, Controller, HttpCode, Get } from '@nestjs/common';
import { Public } from '../../middlewares/auth/decorators/public.decorator';

@Controller('/business-point/get-all-categories')
export class GetBusinessPointCategoriesController {
  constructor(
    private readonly getBusinessPointCategoriesUseCase: GetBusinessPointCategoriesUseCase,
  ) {}

  @Get()
  @Public()
  @HttpCode(200)
  async handle() {
    try {
      const result = await this.getBusinessPointCategoriesUseCase.execute();

      return result.value.businessPointCategories.map((item) => {
        return {
          id: item.id.toString(),
          name: item.name,
        };
      });
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
