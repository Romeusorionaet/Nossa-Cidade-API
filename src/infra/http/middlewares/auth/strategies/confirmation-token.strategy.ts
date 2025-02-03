import { confirmationEmailTokenSchema } from 'src/infra/http/schemas/confirmation-token.schema';
import { ConfirmationEmailTokenPayload } from 'src/core/@types/validation-email-token-payload';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EnvService } from 'src/infra/env/env.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

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

  async validate(payload: ConfirmationEmailTokenPayload) {
    try {
      return confirmationEmailTokenSchema.parse(payload);
    } catch (err: any) {
      throw new BadRequestException(err.err);
    }
  }
}
