import { UsersRepository } from 'src/domain/our-city/application/repositories/users.repository';
import { User } from 'src/domain/our-city/enterprise/entities/user';
import { DrizzleUserMapper } from '../mappers/drizzle-user.mapper';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { users } from '../schemas';
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

  async update(user: User): Promise<void> {
    const data = DrizzleUserMapper.toDrizzle(user);

    await this.drizzle.database
      .update(users)
      .set(data)
      .where(eq(users.id, data.id));
  }
}
