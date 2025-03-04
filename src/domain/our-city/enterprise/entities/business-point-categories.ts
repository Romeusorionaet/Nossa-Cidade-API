import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entities/entity';

export interface businessPointCategoriesProps {
  name: string;
}

export class businessPointCategories extends Entity<businessPointCategoriesProps> {
  get name() {
    return this.props.name;
  }

  static create(props: businessPointCategoriesProps, id?: UniqueEntityID) {
    return new businessPointCategories(
      {
        ...props,
      },
      id,
    );
  }
}
