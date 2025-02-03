import { EncryptRepository } from '../../../repositories/cryptography/encrypt.repository';
import { calculatePermissions } from '../../../utils/calculate-permissions.util';
import { TokenPurposeEnum } from '../../../shared/enums/token-purpose.enum';
import { StaffRepository } from '../../../repositories/staff.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface RefreshTokenUseCaseRequest {
  userId: string;
  email: string;
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
    email,
    publicId,
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    const staff = await this.staffRepository.findByUserId(userId);

    const permissions = calculatePermissions(
      staff?.role || null,
      staff?.id.toString() || null,
    );

    const accessToken = await this.encryptRepository.encryptAccessToken({
      sub: userId,
      publicId,
      email,
      staffId: staff?.id.toString() || null,
      role: staff?.role || null,
      status: staff?.status || null,
      purpose: TokenPurposeEnum.ACCESS_TOKEN,
      permissions,
    });

    const refreshToken = await this.encryptRepository.encryptRefreshToken({
      sub: userId,
      publicId,
      email,
      staffId: staff?.id.toString() || null,
      role: staff?.role || null,
      status: staff?.status || null,
      purpose: TokenPurposeEnum.ACCESS_TOKEN,
      permissions,
    });

    return right({ accessToken, refreshToken });
  }
}
