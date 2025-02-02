import { EnvService } from 'src/infra/env/env.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
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
    return confirmationTokenSchema.parse(payload);
  }
}
