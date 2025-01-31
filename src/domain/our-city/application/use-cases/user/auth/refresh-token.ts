import { EncryptRepository } from '../../../repositories/cryptography/encrypt-repository';
import { StaffRepository } from '../../../repositories/staff-repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface RefreshTokenUseCaseRequest {
  userId: string;
  publicId: string;
}

type RefreshTokenUseCaseResponse = Either<
  null,
  {
    accessToken: string;
    refreshToken: string;
  }
>;

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private encryptRepository: EncryptRepository,
    private staffRepository: StaffRepository,
  ) {}

  async execute({
    userId,
    publicId,
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    const staff = await this.staffRepository.findByUserId(userId);

    const accessToken = await this.encryptRepository.encryptAccessToken({
      sub: userId,
      staffId: staff?.id.toString() || '',
      role: staff?.role || '',
      status: staff?.status || '',
      publicId,
    });

    const refreshToken = await this.encryptRepository.encryptRefreshToken({
      sub: userId,
      staffId: staff?.id.toString() || '',
      role: staff?.role || '',
      status: staff?.status || '',
      publicId,
    });

    return right({ accessToken, refreshToken });
  }
}
