import { HashGeneratorRepository } from '../../../repositories/cryptography/hash-generator.repository';
import { AuthRepository } from '../../../repositories/auth.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface ResetUserPasswordUseCaseRequest {
  password: string;
  email: string;
}

type ResetUserPasswordUseCaseResponse = Either<null, object>;

@Injectable()
export class ResetUserPasswordUseCase {
  constructor(
    private authRepository: AuthRepository,
    private hashGenerator: HashGeneratorRepository,
  ) {}

  async execute({
    password,
    email,
  }: ResetUserPasswordUseCaseRequest): Promise<ResetUserPasswordUseCaseResponse> {
    const hashedNewPassword = await this.hashGenerator.hash(password);

    await this.authRepository.updatePassword({
      hashedNewPassword,
      email,
    });

    return right({});
  }
}
