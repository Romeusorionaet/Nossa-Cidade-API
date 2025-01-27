import { User } from '../../enterprise/entities/user';

// verify if need all that abstracts

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract confirmEmail(token: string): Promise<object | null>;
  abstract update(user: User): Promise<void>;
}
