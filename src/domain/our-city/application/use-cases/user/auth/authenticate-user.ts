import { HashComparerRepository } from '../../../repositories/cryptography/hash-comparer.repository';
import { EncryptRepository } from '../../../repositories/cryptography/encrypt.repository';
import { InvalidCredentialsError } from '../../errors/invalid-credentials-errors';
import { calculatePermissions } from '../../../utils/calculate-permissions.util';
import { EmailNotVerifiedError } from '../../errors/email-not-verified-error';
import { TokenPurposeEnum } from '../../../shared/enums/token-purpose.enum';
import { UsersRepository } from '../../../repositories/users.repository';
import { StaffRepository } from '../../../repositories/staff.repository';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  InvalidCredentialsError | EmailNotVerifiedError,
  {
    accessToken: string;
    refreshToken: string;
  }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private staffRepository: StaffRepository,
    private hashComparer: HashComparerRepository,
    private encrypt: EncryptRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError());
    }

    if (!user.emailVerified) {
      return left(new EmailNotVerifiedError());
    }

    const staff = await this.staffRepository.findByUserId(user.id.toString());

    const permissions = calculatePermissions(
      staff?.role || null,
      staff?.id.toString() || null,
    );

    const accessToken = await this.encrypt.encryptAccessToken({
      sub: user.id.toString(),
      publicId: user.publicId.toString(),
      email: user.email,
      staffId: staff?.id.toString() || null,
      role: staff?.role || null,
      status: staff?.status || null,
      purpose: TokenPurposeEnum.ACCESS_TOKEN,
      permissions,
    });

    const refreshToken = await this.encrypt.encryptRefreshToken({
      sub: user.id.toString(),
      publicId: user.publicId.toString(),
      email: user.email,
      purpose: TokenPurposeEnum.REFRESH_TOKEN,
      permissions,
    });

    return right({
      accessToken,
      refreshToken,
    });
  }
}
