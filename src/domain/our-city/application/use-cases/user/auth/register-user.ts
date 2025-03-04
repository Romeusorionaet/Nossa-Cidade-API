import { AuthEmailServiceRepository } from '../../../repositories/services/email/auth-email-service.repository';
import { HashGeneratorRepository } from '../../../repositories/cryptography/hash-generator.repository';
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error';
import { UsersRepository } from '../../../repositories/users.repository';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { User } from 'src/domain/our-city/enterprise/entities/user';
import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface RegisterUserUseCaseRequest {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGeneratorRepository,
    private authEmailService: AuthEmailServiceRepository,
  ) {}

  async execute({
    username,
    email,
    password,
    avatar,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const resultUser = await this.usersRepository.findByEmail(email);

    if (resultUser) {
      return left(new UserAlreadyExistsError());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    await this.authEmailService.sendValidationEmail({
      email,
    });

    const user = User.create({
      username,
      email,
      passwordHash: hashedPassword,
      avatar,
      emailVerified: false,
      publicId: new UniqueEntityID(),
    });

    await this.usersRepository.create(user);

    return right({ user });
  }
}
