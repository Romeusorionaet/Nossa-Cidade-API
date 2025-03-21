import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entities/entity';

export interface BusinessPointFavoritesProps {
  userId: UniqueEntityID;
  businessPointId: UniqueEntityID;
}

export class BusinessPointFavorites extends Entity<BusinessPointFavoritesProps> {
  get userId() {
    return this.props.userId;
  }

  get businessPointId() {
    return this.props.businessPointId;
  }

  static create(props: BusinessPointFavoritesProps, id?: UniqueEntityID) {
    return new BusinessPointFavorites(
      {
        ...props,
      },
      id,
    );
  }
}
