import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/@types/optional';
import { Entity } from 'src/core/entities/entity';

export interface ProductProps {
  categoryId: UniqueEntityID;
  businessPointId: UniqueEntityID;
  title: string;
  price: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class Product extends Entity<ProductProps> {
  get categoryId() {
    return this.props.categoryId;
  }

  get businessPointId() {
    return this.props.businessPointId;
  }

  get title() {
    return this.props.title;
  }

  get price() {
    return this.props.price;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<ProductProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    return new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }

  update(props: Partial<ProductProps>): Product {
    return new Product(
      {
        ...this.props,
        ...props,
        updatedAt: new Date(),
      },
      this.id,
    );
  }
}
