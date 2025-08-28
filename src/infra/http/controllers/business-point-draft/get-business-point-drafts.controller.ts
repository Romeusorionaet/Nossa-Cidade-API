import {
  BadRequestException,
  Controller,
  HttpCode,
  Get,
  Param,
} from '@nestjs/common';
import { Public } from '../../middlewares/auth/decorators/public.decorator';
import { GetBusinessPointDraftsUseCase } from 'src/domain/our-city/application/use-cases/business-point-draft/get-business-point-drafts';
import { BusinessPointDraftPresenter } from '../../presenters/business-point-draft.presenter';

@Controller('/business-point/drafts/:page')
export class GetBusinessPointDraftsController {
  constructor(
    private readonly getBusinessPointDraftsUseCase: GetBusinessPointDraftsUseCase,
  ) {}

  @Get()
  @Public()
  @HttpCode(200)
  async handle(@Param('page') page: number) {
    try {
      const result = await this.getBusinessPointDraftsUseCase.execute({
        page,
      });

      return result.value.businessPointDrafts.map(
        BusinessPointDraftPresenter.toHTTP,
      );
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
