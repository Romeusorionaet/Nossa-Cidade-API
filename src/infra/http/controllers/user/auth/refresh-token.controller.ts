import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Get,
  Res,
} from '@nestjs/common';
import { RefreshTokenUseCase } from 'src/domain/our-city/application/use-cases/user/auth/refresh-token';
import { CurrentUser } from 'src/infra/http/middlewares/auth/decorators/current-user.decorator';
import { RefreshTokenGuard } from 'src/infra/http/middlewares/auth/guards/refresh-token.guard';
import { RefreshTokenPayload } from 'src/core/@types/refresh-token-payload';
import { FastifyReply } from 'fastify';

@Controller('/auth/refresh-token')
export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Get()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  async handle(
    @CurrentUser() user: RefreshTokenPayload,
    @Res() res: FastifyReply,
  ) {
    try {
      const { sub: id, email } = user;

      const result = await this.refreshTokenUseCase.execute({
        userId: id,
        publicId: user.publicId.toString(),
        email,
      });

      return res.send({
        accessToken: result.value.accessToken,
        refreshToken: result.value.refreshToken,
      });
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
