import { UpdatePasswordAuth } from 'src/core/@types/update-password-auth';
import { User } from '../../enterprise/entities/user';

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<User>;
  abstract confirmEmail(email: string): Promise<object | null>;
  abstract updatePassword({
    hashedNewPassword,
    email,
  }: UpdatePasswordAuth): Promise<void>;
}
