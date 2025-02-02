import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { User } from 'src/domain/our-city/enterprise/entities/user';
import { UsersInsertType } from '../schemas';

export class DrizzleUserMapper {
  static toDomain(raw: UsersInsertType): User {
    return User.create(
      {
        publicId: new UniqueEntityID(raw.publicId),
        username: raw.username,
        email: raw.email,
        passwordHash: raw.passwordHash,
        avatar: raw.avatar,
        emailVerified: raw.emailVerified,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(user: User): UsersInsertType {
    return {
      id: user.id.toString(),
      publicId: user.publicId.toString(),
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
