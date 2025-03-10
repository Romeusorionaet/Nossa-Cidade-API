import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entities/entity';

export interface SharedItemProps {
  name: string;
}

export class sharedItem extends Entity<SharedItemProps> {
  get name() {
    return this.props.name;
  }

  static create(props: SharedItemProps, id?: UniqueEntityID) {
    return new sharedItem(
      {
        ...props,
      },
      id,
    );
  }
}
