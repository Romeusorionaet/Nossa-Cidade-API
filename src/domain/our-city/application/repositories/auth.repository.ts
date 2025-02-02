import { User } from '../../enterprise/entities/user';

export interface UpdatePasswordProps {
  hashedNewPassword: string;
  email: string;
}

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<User>;
  abstract updatePassword({
    hashedNewPassword,
    email,
  }: UpdatePasswordProps): Promise<void>;
}
