import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
