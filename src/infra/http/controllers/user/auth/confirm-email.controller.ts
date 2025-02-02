import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Post,
} from '@nestjs/common';
import { InvalidCredentialsError } from 'src/domain/our-city/application/use-cases/errors/invalid-credentials-errors';
import { ConfirmationTokenGuard } from 'src/infra/http/middlewares/auth/guards/confirmation-token.guard';
import { ConfirmEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/confirm-email';
import { CurrentUser } from 'src/infra/http/middlewares/auth/decorators/current-user.decorator';
import { ConfirmationTokenPayload } from 'src/infra/http/schemas/confirmation-token.schema';

@Controller('/auth/confirm-email')
export class ConfirmEmailController {
  constructor(private confirmEmailUseCase: ConfirmEmailUseCase) {}

  @Post()
  @UseGuards(ConfirmationTokenGuard)
  @HttpCode(200)
  async handle(@CurrentUser() user: ConfirmationTokenPayload) {
    try {
      const { email } = user;

      const result = await this.confirmEmailUseCase.execute({ email });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case InvalidCredentialsError:
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
