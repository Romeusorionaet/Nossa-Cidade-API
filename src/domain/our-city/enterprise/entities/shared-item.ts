import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entities/entity';
import { SearchableText } from '../value-objects/searchable-text';

export interface SharedItemProps {
  name: string;
  searchName?: SearchableText;
}

export class SharedItem extends Entity<SharedItemProps> {
  get name() {
    return this.props.name;
  }

  get searchName() {
    return this.props.searchName;
  }

  static create(props: SharedItemProps, id?: UniqueEntityID) {
    return new SharedItem(
      {
        ...props,
        searchName:
          props.searchName ?? SearchableText.createFromText(props.name),
      },
      id,
    );
  }
}
