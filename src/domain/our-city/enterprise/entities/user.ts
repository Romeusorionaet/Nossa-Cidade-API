import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/@types/optional';
import { Entity } from 'src/core/entities/entity';

export interface UserProps {
  publicId: UniqueEntityID;
  username: string;
  email: string;
  passwordHash: string;
  avatar: string;
  emailVerified: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class User extends Entity<UserProps> {
  get publicId() {
    return this.props.publicId;
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get passwordHash() {
    return this.props.passwordHash;
  }

  get avatar() {
    return this.props.avatar;
  }

  get emailVerified() {
    return this.props.emailVerified;
  }

  private set emailVerified(value: boolean) {
    this.props.emailVerified = value;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    return new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }

  update(props: Partial<UserProps>): User {
    return new User(
      {
        ...this.props,
        ...props,
        updatedAt: new Date(),
      },
      this.id,
    );
  }
}
