import { DatabaseFrozenError } from 'src/core/errors/database-frozen-error';
import { UsersRepository } from '../../repositories/users.repository';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

type WakeUpDatabaseUseCaseResponse = Either<DatabaseFrozenError, Object>;

@Injectable()
export class WakeUpDatabaseUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<WakeUpDatabaseUseCaseResponse> {
    const result = await this.usersRepository.wakeUpDatabase();

    if (!result) {
      return left(new DatabaseFrozenError());
    }

    return right({});
  }
}
