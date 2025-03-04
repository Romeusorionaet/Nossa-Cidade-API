import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common';
import {
  userProfileValidationPipe,
  UserProfile,
} from 'src/infra/http/schemas/user-profile.schema';
import { UserAlreadyExistsError } from 'src/domain/our-city/application/use-cases/errors/user-already-exists-error';
import { RegisterUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user';
import { Public } from 'src/infra/http/middlewares/auth/decorators/public.decorator';

@Controller('/auth/register')
export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @Public()
  @Post()
  @HttpCode(200)
  async handle(@Body(userProfileValidationPipe) body: UserProfile) {
    try {
      const { email, picture, username, password } = body;

      const result = await this.registerUserUseCase.execute({
        avatar: picture,
        email,
        username,
        password,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case UserAlreadyExistsError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return {
        message:
          'Enviamos um email de confirmação. Por favor, verifique sua caixa de entrada e siga as instruções para confirmar seu endereço de email.',
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
