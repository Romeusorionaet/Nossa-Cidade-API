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
import { EnvService } from 'src/infra/env/env.service';
import { FastifyReply } from 'fastify';

@Controller('/auth/authenticate/oauth/callback')
export class AuthenticateWidthOAuthController {
  constructor(
    private registerUserWithOAuthUseCase: RegisterUserWithOAuthUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private envService: EnvService,
  ) {}

  @Public()
  @Post()
  @HttpCode(302)
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

      const result = resultRefreshToken.value;
      const redirectUrl = `${this.envService.get('NOSSA_CIDADE_HOST')}?access_token=${result.accessToken}&refresh_token=${result.refreshToken}`;

      return res.redirect(redirectUrl);
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
