import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import {
  forgotUserPasswordSchemaPipe,
  type ForgotUserPasswordRequest,
} from 'src/infra/http/schemas/forgot-user-password.schema';
import type { ResetUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/reset-user-password';
import { ForgotPasswordTokenGuard } from 'src/infra/http/middlewares/auth/guards/forgot-password-token.guard';
import { CurrentUser } from 'src/infra/http/middlewares/auth/decorators/current-user.decorator';
import type { ForgotPasswordTokenPayload } from 'src/core/@types/forgot-password-token-payload';

@Controller('/auth/reset-password')
export class ResetUserPasswordController {
  constructor(private resetUserPasswordUseCase: ResetUserPasswordUseCase) {}

  @Post()
  @UseGuards(ForgotPasswordTokenGuard)
  @HttpCode(200)
  async handle(
    @CurrentUser() user: ForgotPasswordTokenPayload,
    @Body(forgotUserPasswordSchemaPipe) body: ForgotUserPasswordRequest,
  ) {
    try {
      const { email } = user;
      const { password } = body;

      await this.resetUserPasswordUseCase.execute({
        password,
        email,
      });

      return { message: 'Senha atualizada!' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
