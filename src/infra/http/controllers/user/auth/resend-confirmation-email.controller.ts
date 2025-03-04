import {
  BadRequestException,
  Controller,
  HttpCode,
  Body,
  Post,
  Res,
} from '@nestjs/common';
import {
  ResendConfirmationEmailRequest,
  resendConfirmationEmailSchemaValidationPipe,
} from 'src/infra/http/schemas/resend-confirmation-email.schema';
import { ResendConfirmationEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/resend-confirmation-email';
import { Public } from 'src/infra/http/middlewares/auth/decorators/public.decorator';
import { FastifyReply } from 'fastify';

@Controller('/auth/resend-confirmation-email')
export class ResendConfirmationEmailController {
  constructor(
    private resendConfirmationEmailUseCase: ResendConfirmationEmailUseCase,
  ) {}

  @Post()
  @Public()
  @HttpCode(200)
  async handle(
    @Body(resendConfirmationEmailSchemaValidationPipe)
    body: ResendConfirmationEmailRequest,
    @Res() res: FastifyReply,
  ) {
    try {
      const { email } = body;

      await this.resendConfirmationEmailUseCase.execute({ email });

      return res.send({
        message: `Um novo token foi enviado para o email: ${email}`,
      });
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
