import { UsersRepository } from 'src/domain/our-city/application/repositories/users.repository';
import { User } from 'src/domain/our-city/enterprise/entities/user';
import { DrizzleUserMapper } from '../mappers/drizzle-user.mapper';
import { users, UsersInsertType } from '../schemas';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleUserRepository implements UsersRepository {
  constructor(private drizzle: DatabaseClient) {}
  async create(user: User): Promise<void> {
    const data = DrizzleUserMapper.toDrizzle(user);

    await this.drizzle.database.insert(users).values(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.drizzle.database
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      return null;
    }

    return DrizzleUserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await this.drizzle.database
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (!user) {
      return null;
    }

    return DrizzleUserMapper.toDomain(user);
  }

  async confirmEmail(email: string): Promise<object | null> {
    const [user] = await this.drizzle.database
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      return null;
    }

    await this.drizzle.database
      .update(users)
      .set({ emailVerified: true } as Partial<UsersInsertType>)
      .where(eq(users.email, email));

    return {};
  }

  async update(user: User): Promise<void> {
    const data = DrizzleUserMapper.toDrizzle(user);

    await this.drizzle.database
      .update(users)
      .set(data)
      .where(eq(users.id, data.id));
  }
}
