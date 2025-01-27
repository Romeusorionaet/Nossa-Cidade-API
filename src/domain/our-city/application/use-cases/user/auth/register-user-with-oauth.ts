import { UsersRepository } from '../../../repositories/users-repository';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { User } from 'src/domain/our-city/enterprise/entities/user';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

interface RegisterUserWithOAuthUseCaseRequest {
  email: string;
  username: string;
  avatar: string;
  emailVerified: boolean;
}

type RegisterUserWithOAuthUseCaseResponse = {
  user: User;
};

@Injectable()
export class RegisterUserWithOAuthUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    username,
    avatar,
    emailVerified,
  }: RegisterUserWithOAuthUseCaseRequest): Promise<RegisterUserWithOAuthUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      const user = User.create({
        email,
        username,
        passwordHash: await hash('123456', 8), // TODO for while
        avatar,
        emailVerified,
        publicId: new UniqueEntityID(),
      });

      await this.usersRepository.create(user);

      return { user };
    }

    if (!user.emailVerified) {
      const userUpdated = user.update({
        emailVerified: true,
      });

      await this.usersRepository.update(userUpdated);
    }

    return { user };
  }
}
