import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { RegisterUserWithOAuthUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user-with-oauth';
import { InvalidCredentialsError } from 'src/domain/our-city/application/use-cases/errors/invalid-credentials-errors';
import { RefreshTokenUseCase } from 'src/domain/our-city/application/use-cases/user/auth/refresh-token';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import { Public } from 'src/infra/http/middlewares/auth/public';
import { EnvService } from 'src/infra/env/env.service';
import { FastifyReply } from 'fastify';
import { z } from 'zod';

export const profileFromOAuthSchema = z.object({
  email: z.string(),
  username: z.string(),
  picture: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(profileFromOAuthSchema);

type ProfileFromOAuthSchema = z.infer<typeof profileFromOAuthSchema>;

@Controller('/auth/register/oauth/callback')
export class RegisterWidthOAuthController {
  constructor(
    private registerUserWithOAuthUseCase: RegisterUserWithOAuthUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private envService: EnvService,
  ) {}

  @Public()
  @Post()
  @HttpCode(302)
  async handle(
    @Body(bodyValidationPipe) body: ProfileFromOAuthSchema,
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
      });

      if (resultRefreshToken.isLeft()) {
        const err = resultRefreshToken.value;
        switch (err.constructor) {
          case InvalidCredentialsError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      const result = resultRefreshToken.value;
      const redirectUrl = `${this.envService.get('NOSSA_CIDADE_HOST')}?access_token=${result.accessToken}&refresh_token=${result.refreshToken}`;

      return res.redirect(redirectUrl);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
