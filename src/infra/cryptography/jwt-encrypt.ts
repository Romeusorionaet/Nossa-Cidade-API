import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt-repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtEncrypt implements EncryptRepository {
  constructor(private readonly jwtService: JwtService) {}

  async encryptAccessToken(payload: Record<string, unknown>): Promise<string> {
    if (payload.staffId === '') {
      payload.permissions = ['read'];
    } else {
      payload.permissions = ['read', 'write', 'delete', 'restricted_read'];
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
    });

    return accessToken;
  }

  async encryptRefreshToken(payload: Record<string, unknown>): Promise<string> {
    const refreshToken = this.jwtService.signAsync(payload, {
      expiresIn: '120m',
    });

    return refreshToken;
  }
}
