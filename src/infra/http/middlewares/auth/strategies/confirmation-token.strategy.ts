import { EnvService } from 'src/infra/env/env.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ConfirmationTokenPayload,
  confirmationTokenSchema,
} from 'src/infra/http/schemas/confirmation-token.schema';

@Injectable()
export class ConfirmationTokenStrategy extends PassportStrategy(
  Strategy,
  'confirmation-token',
) {
  constructor(envService: EnvService) {
    const publicKey = envService.get('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: ConfirmationTokenPayload) {
    try {
      return confirmationTokenSchema.parse(payload);
    } catch (err) {
      throw new BadRequestException(err.err);
    }
  }
}
