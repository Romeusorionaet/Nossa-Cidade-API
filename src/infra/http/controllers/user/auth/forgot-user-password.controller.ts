import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Post,
} from '@nestjs/common';
import type { ForgotUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/forgot-user-password';
import { CurrentUser } from 'src/infra/http/middlewares/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from 'src/infra/http/middlewares/auth/guards/access-token.guard';
import type { AccessTokenPayload } from 'src/core/@types/access-token-payload';

@Controller('/auth/forgot-password')
export class ForgotUserPasswordController {
  constructor(private forgotUserPasswordUseCase: ForgotUserPasswordUseCase) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@CurrentUser() user: AccessTokenPayload) {
    try {
      const { email } = user;

      await this.forgotUserPasswordUseCase.execute({ email });

      return {
        message:
          'Enviamos um email para a troca da senha. Por favor, verifique sua caixa de entrada e siga as instruções para trocar sua senha.',
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
