import { AuthRepository } from 'src/domain/our-city/application/repositories/auth.repository';
import { UpdatePasswordAuth } from 'src/core/@types/update-password-auth';
import { User } from 'src/domain/our-city/enterprise/entities/user';
import { DrizzleUserMapper } from '../mappers/drizzle-user.mapper';
import { users, UsersInsertType } from '../schemas';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleAuthRepository implements AuthRepository {
  constructor(private drizzle: DatabaseClient) {}

  async findByEmail(email: string): Promise<User> {
    const [user] = await this.drizzle.database
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      return null;
    }

    return DrizzleUserMapper.toDomain(user);
  }

  async updatePassword({
    hashedNewPassword,
    email,
  }: UpdatePasswordAuth): Promise<void> {
    await this.drizzle.database
      .update(users)
      .set({ passwordHash: hashedNewPassword } as Partial<UsersInsertType>)
      .where(eq(users.email, email));
  }
}
