import { InvalidCredentialsError } from '../../errors/invalid-credentials-errors';
import { UsersRepository } from '../../../repositories/users.repository';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface ConfirmEmailUseCaseRequest {
  email: string;
}

type ConfirmEmailUseCaseResponse = Either<InvalidCredentialsError, object>;

@Injectable()
export class ConfirmEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: ConfirmEmailUseCaseRequest): Promise<ConfirmEmailUseCaseResponse> {
    const result = await this.usersRepository.confirmEmail(email);

    if (!result) {
      return left(new InvalidCredentialsError());
    }

    return right({});
  }
}
