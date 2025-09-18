import { TokenPurposeEnum } from 'src/domain/our-city/application/shared/enums/token-purpose.enum';
import { accessTokenSchema } from 'src/infra/http/schemas/access-token.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EnvService } from 'src/infra/env/env.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  TokenPurposeEnum.REFRESH_TOKEN,
) {
  constructor(envService: EnvService) {
    const publicKey = envService.get('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: RefreshTokenPayload) {
    try {
      return accessTokenSchema.parse(payload);
    } catch (err: any) {
      throw new BadRequestException(err.err);
    }
  }
}
