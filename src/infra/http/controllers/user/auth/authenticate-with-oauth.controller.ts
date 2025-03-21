import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import {
  userProfileFromAuthValidationPipe,
  UserProfileFromAuth,
} from 'src/infra/http/schemas/user-profile.schema';
import { RegisterUserWithOAuthUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user-with-oauth';
import { RefreshTokenUseCase } from 'src/domain/our-city/application/use-cases/user/auth/refresh-token';
import { Public } from 'src/infra/http/middlewares/auth/decorators/public.decorator';
import { FastifyReply } from 'fastify';

@Controller('/auth/authenticate/oauth/callback')
export class AuthenticateWidthOAuthController {
  constructor(
    private readonly registerUserWithOAuthUseCase: RegisterUserWithOAuthUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Public()
  @Post()
  @HttpCode(200)
  async handle(
    @Body(userProfileFromAuthValidationPipe) body: UserProfileFromAuth,
    @Res() res: FastifyReply,
  ) {
    try {
      const { email, picture, username } = body;

      const resultRegisterWithOAuth =
        await this.registerUserWithOAuthUseCase.execute({
          avatar: picture,
          email,
          username,
        });

      const user = resultRegisterWithOAuth.user;

      const resultRefreshToken = await this.refreshTokenUseCase.execute({
        userId: user.id.toString(),
        publicId: user.publicId.toString(),
        email,
      });

      return res.send({
        accessToken: resultRefreshToken.value.accessToken,
        refreshToken: resultRefreshToken.value.refreshToken,
      });
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
