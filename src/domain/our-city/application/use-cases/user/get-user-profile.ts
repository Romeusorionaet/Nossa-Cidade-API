import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from 'src/domain/our-city/enterprise/entities/user';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

type GetUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    userProfile: User;
  }
>;

@Injectable()
export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const userProfile = await this.usersRepository.findById(userId);

    if (!userProfile) {
      return left(new ResourceNotFoundError());
    }

    return right({
      userProfile,
    });
  }
}
