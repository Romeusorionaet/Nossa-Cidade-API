import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common';
import {
  authenticateSchemaValidationPipe,
  AuthenticationRequest,
} from 'src/infra/http/schemas/authenticate.schema';
import { InvalidCredentialsError } from 'src/domain/our-city/application/use-cases/errors/invalid-credentials-errors';
import { EmailNotVerifiedError } from 'src/domain/our-city/application/use-cases/errors/email-not-verified-error';
import { AuthenticateUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/authenticate-user';
import { Public } from 'src/infra/http/middlewares/auth/decorators/public.decorator';

@Controller('/auth/authenticate')
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Public()
  @Post()
  @HttpCode(200)
  async handle(
    @Body(authenticateSchemaValidationPipe) body: AuthenticationRequest,
  ) {
    try {
      const { email, password } = body;

      const result = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case InvalidCredentialsError:
          case EmailNotVerifiedError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return {
        accessToken: result.value.accessToken,
        refreshToken: result.value.refreshToken,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
