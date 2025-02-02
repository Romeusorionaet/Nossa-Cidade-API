import {
  accessTokenSchema,
  UserPayload,
} from 'src/infra/http/schemas/access-token.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EnvService } from 'src/infra/env/env.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(envService: EnvService) {
    const publicKey = envService.get('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: UserPayload) {
    try {
      return accessTokenSchema.parse(payload);
    } catch (err) {
      throw new BadRequestException(err.err);
    }
  }
}
