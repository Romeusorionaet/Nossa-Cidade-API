import type { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import type { ConfirmationEmailTokenPayload } from 'src/core/@types/validation-email-token-payload';
import type { ForgotPasswordTokenPayload } from 'src/core/@types/forgot-password-token-payload';
import type { AccessTokenPayload } from 'src/core/@types/access-token-payload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { RefreshTokenPayload } from 'src/core/@types/refresh-token-payload';

@Injectable()
export class JwtEncrypt implements EncryptRepository {
  constructor(private readonly jwtService: JwtService) {}

  async encryptAccessToken(payload: AccessTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
    });
  }

  async encryptRefreshToken(payload: RefreshTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '120m',
    });
  }

  async encryptValidationEmailToken(
    payload: ConfirmationEmailTokenPayload,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
    });
  }

  async encryptForgotPasswordToken(
    payload: ForgotPasswordTokenPayload,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    });
  }
}
