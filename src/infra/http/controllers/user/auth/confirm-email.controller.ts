import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ConfirmationTokenGuard } from 'src/infra/http/middlewares/auth/guards/confirmation-token.guard';
import { ConfirmEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/confirm-email';
import { CurrentUser } from 'src/infra/http/middlewares/auth/decorators/current-user.decorator';

@Controller('/auth/confirm-email')
export class ConfirmEmailController {
  constructor(private readonly confirmEmailUseCase: ConfirmEmailUseCase) {}

  @Post()
  @UseGuards(ConfirmationTokenGuard)
  @HttpCode(201)
  async handle(@CurrentUser() user: ConfirmationEmailTokenPayload) {
    try {
      const { email } = user;

      const result = await this.confirmEmailUseCase.execute({ email });

      if (result.isLeft()) {
        throw new BadRequestException(result.value.message);
      }

      return { message: 'Email confirmado!' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
