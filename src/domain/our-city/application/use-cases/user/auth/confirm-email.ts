import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { UsersRepository } from '../../../repositories/users-repository';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface ConfirmEmailUseCaseRequest {
  token: string;
}

type ConfirmEmailUseCaseResponse = Either<ResourceNotFoundError, object>;

@Injectable()
export class ConfirmEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    token,
  }: ConfirmEmailUseCaseRequest): Promise<ConfirmEmailUseCaseResponse> {
    const result = await this.usersRepository.confirmEmail(token);

    if (!result) {
      return left(new ResourceNotFoundError());
    }

    return right({});
  }
}
