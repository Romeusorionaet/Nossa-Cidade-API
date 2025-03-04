import { HashGeneratorRepository } from '../../../repositories/cryptography/hash-generator.repository';
import { HashComparerRepository } from '../../../repositories/cryptography/hash-comparer.repository';
import { InvalidCredentialsError } from '../../errors/invalid-credentials-errors';
import { AuthRepository } from '../../../repositories/auth.repository';
import { UserNotFoundError } from '../../errors/user-not-found-error';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface UpdateUserPasswordUseCaseRequest {
  newPassword: string;
  oldPassword: string;
  email: string;
}

type UpdateUserPasswordUseCaseResponse = Either<
  InvalidCredentialsError | UserNotFoundError,
  object
>;

@Injectable()
export class UpdateUserPasswordUseCase {
  constructor(
    private authRepository: AuthRepository,
    private hashGenerator: HashGeneratorRepository,
    private hashComparer: HashComparerRepository,
  ) {}

  async execute({
    newPassword,
    oldPassword,
    email,
  }: UpdateUserPasswordUseCaseRequest): Promise<UpdateUserPasswordUseCaseResponse> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      return left(new UserNotFoundError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      oldPassword,
      user.passwordHash,
    );

    const isSamePassword = await this.hashComparer.compare(
      newPassword,
      user.passwordHash,
    );

    if (isSamePassword || !isPasswordValid) {
      return left(new InvalidCredentialsError());
    }

    const hashedNewPassword = await this.hashGenerator.hash(newPassword);

    await this.authRepository.updatePassword({ hashedNewPassword, email });

    return right({});
  }
}
