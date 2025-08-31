import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/@types/optional';
import { Entity } from 'src/core/entities/entity';
import { SearchableText } from '../value-objects/search-title';

export interface ProductProps {
  businessPointId: UniqueEntityID;
  businessPointName: string;
  title: string;
  searchTitle: SearchableText;
  price: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class Product extends Entity<ProductProps> {
  get businessPointId() {
    return this.props.businessPointId;
  }

  get businessPointName() {
    return this.props.businessPointName;
  }

  get title() {
    return this.props.title;
  }

  get searchTitle() {
    return this.props.searchTitle;
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

  set title(title: string) {
    this.props.title = title;
    this.props.searchTitle = SearchableText.createFromText(title);
  }

  static create(
    props: Optional<ProductProps, 'createdAt' | 'updatedAt' | 'searchTitle'>,
    id?: UniqueEntityID,
  ) {
    return new Product(
      {
        ...props,
        searchTitle:
          props.searchTitle ?? SearchableText.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }

  update(props: Partial<ProductProps>): Product {
    const updatedTitle = props.title ?? this.props.title;

    return new Product(
      {
        ...this.props,
        ...props,
        title: updatedTitle,
        searchTitle: SearchableText.createFromText(updatedTitle),
        updatedAt: new Date(),
      },
      this.id,
    );
  }
}
