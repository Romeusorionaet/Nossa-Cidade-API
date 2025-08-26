import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entities/entity';

export interface ProductImageProps {
  productId: UniqueEntityID;
  url: string;
}

export class ProductImage extends Entity<ProductImageProps> {
  get productId() {
    return this.props.productId;
  }

  get url() {
    return this.props.url;
  }

  static create(props: ProductImageProps, id?: UniqueEntityID) {
    return new ProductImage(
      {
        ...props,
      },
      id,
    );
  }
}
