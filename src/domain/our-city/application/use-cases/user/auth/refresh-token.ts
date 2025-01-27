import { StaffRepository } from '../../../repositories/staff-repository';
import { Encrypt } from '../../../repositories/cryptography/encrypt';
import { InvalidTokenError } from '../../errors/invalid-token-error';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface RefreshTokenUseCaseRequest {
  userId: string;
  publicId: string;
}

type RefreshTokenUseCaseResponse = Either<
  InvalidTokenError,
  {
    accessToken: string;
    refreshToken: string;
  }
>;

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private encrypt: Encrypt,
    private staffRepository: StaffRepository,
  ) {}

  async execute({
    userId,
    publicId,
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    const staff = await this.staffRepository.findByUserId(userId);

    const accessToken = await this.encrypt.encryptAccessToken({
      sub: userId,
      staffId: staff?.id.toString() || '',
      role: staff?.role || '',
      publicId,
    });

    const refreshToken = await this.encrypt.encryptRefreshToken({
      sub: userId,
      staffId: staff?.id.toString() || '',
      role: staff?.role || '',
      publicId,
    });

    return right({ accessToken, refreshToken });
  }
}
