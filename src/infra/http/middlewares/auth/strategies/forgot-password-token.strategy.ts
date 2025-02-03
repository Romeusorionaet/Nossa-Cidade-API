import { forgotPasswordTokenSchema } from 'src/infra/http/schemas/forgot-password-token.schema';
import { ForgotPasswordTokenPayload } from 'src/core/@types/forgot-password-token-payload';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EnvService } from 'src/infra/env/env.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class ForgotPasswordTokenStrategy extends PassportStrategy(
  Strategy,
  'forgot-password-token',
) {
  constructor(envService: EnvService) {
    const publicKey = envService.get('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: ForgotPasswordTokenPayload) {
    try {
      return forgotPasswordTokenSchema.parse(payload);
    } catch (err: any) {
      throw new BadRequestException(err.err);
    }
  }
}
