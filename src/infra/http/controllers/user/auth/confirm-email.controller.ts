import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ConfirmEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/confirm-email';
import { CurrentUser } from 'src/infra/http/middlewares/auth/current-user-decorator';
import { ConfirmationTokenPayload } from 'src/domain/authentication/token-schema';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';

@Controller('/auth/confirm-email')
export class ConfirmEmailController {
  constructor(private confirmEmailUseCase: ConfirmEmailUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@CurrentUser() user: ConfirmationTokenPayload) {
    try {
      const { email } = user;

      const result = await this.confirmEmailUseCase.execute({ email });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case ResourceNotFoundError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return { message: 'Email confirmado!' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
