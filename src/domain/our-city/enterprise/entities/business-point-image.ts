import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entities/entity';

export interface BusinessPointImageProps {
  businessPointId: UniqueEntityID;
  url: string;
}

export class BusinessPointImage extends Entity<BusinessPointImageProps> {
  get businessPointId() {
    return this.props.businessPointId;
  }

  get url() {
    return this.props.url;
  }

  static create(props: BusinessPointImageProps, id?: UniqueEntityID) {
    return new BusinessPointImage(
      {
        ...props,
      },
      id,
    );
  }
}
