import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Body,
  Post,
} from '@nestjs/common';
import {
  businessPointSchemaValidationPipe,
  businessPointRequest,
} from '../../schemas/business-point.schema';
import { RegisterBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/register-business-point';
import { ValidateBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/validate-business-point';
import { PromoteUserToMerchantUseCase } from 'src/domain/our-city/application/use-cases/staff/promote-user-to-merchant';
import { CurrentUser } from '../../middlewares/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';
import { GeometryPoint } from 'src/core/@types/geometry';

@Controller('/business-point/register')
export class RegisterBusinessPointController {
  constructor(
    private validateBusinessPointUseCase: ValidateBusinessPointUseCase,
    private registerBusinessPointUseCase: RegisterBusinessPointUseCase,
    private promoterUserToMerchantUseCase: PromoteUserToMerchantUseCase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(
    @Body(businessPointSchemaValidationPipe) body: businessPointRequest,
    @CurrentUser() user: AccessTokenPayload,
  ) {
    try {
      const businessPoint = body;
      const { sub: userId } = user;

      const location: GeometryPoint = {
        type: 'Point',
        coordinates: [
          businessPoint.location.latitude,
          businessPoint.location.longitude,
        ],
      };

      await this.validateBusinessPointUseCase.execute({
        location,
      });

      await this.registerBusinessPointUseCase.execute({
        categoryId: businessPoint.categoryId,
        censorship: businessPoint.censorship,
        location,
        name: businessPoint.name,
        openingHours: businessPoint.openingHours,
        ownerId: businessPoint.ownerId,
        status: businessPoint.status,
      });

      await this.promoterUserToMerchantUseCase.execute({ id: userId });

      return { message: 'Você se tornou um comerciante' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
