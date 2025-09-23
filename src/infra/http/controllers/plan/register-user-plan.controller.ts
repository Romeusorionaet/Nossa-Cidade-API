import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { RegisterUserPlanUseCase } from 'src/domain/our-city/application/use-cases/plan/register-user-plan';
import {
  UserPlanRequest,
  userPlanRequestSchemaValidationPipe,
} from '../../schemas/user-plan-request.schema';
import { CurrentUser } from '../../middlewares/auth/decorators/current-user.decorator';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';

@Controller('/user-plan/register')
export class RegisterUserPlanController {
  constructor(
    private readonly registerUserPlanUseCase: RegisterUserPlanUseCase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(201)
  async handle(
    @CurrentUser() user: AccessTokenPayload,
    @Body(userPlanRequestSchemaValidationPipe) body: UserPlanRequest,
  ) {
    try {
      const data = body;

      const result = await this.registerUserPlanUseCase.execute({
        planId: data.planId,
        userId: user.sub,
        billingCycle: data.billingCycle,
        startDate: data.startDate,
        paymentReference: data.paymentReference,
      });

      if (result.isLeft()) {
        throw new BadRequestException(result.value.message);
      }

      return {};
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
