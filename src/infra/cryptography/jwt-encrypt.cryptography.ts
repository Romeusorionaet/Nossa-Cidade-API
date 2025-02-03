import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { ValidationEmailTokenPayload } from 'src/core/@types/validation-email-token-payload';
import { ForgotPasswordTokenPayload } from 'src/core/@types/forgot-password-token-payload';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtEncrypt implements EncryptRepository {
  constructor(private readonly jwtService: JwtService) {}

  async encryptAccessToken(
    payload: AccessTokenPayload<'access-token'>,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
    });
  }

  async encryptRefreshToken(
    payload: AccessTokenPayload<'access-token'>,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '120m',
    });
  }

  async encryptValidationEmailToken(
    payload: ValidationEmailTokenPayload<'confirmation-token'>,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    });
  }

  async encryptForgotPasswordToken(
    payload: ForgotPasswordTokenPayload<'forgot-password-token'>,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    });
  }
}
