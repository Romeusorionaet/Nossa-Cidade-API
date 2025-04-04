import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { BusinessPointStatus } from './enums/business-point-status';
import { GeometryPoint } from 'src/core/@types/geometry';
import { Optional } from 'src/core/@types/optional';
import { Entity } from 'src/core/entities/entity';

export interface BusinessPointProps {
  categoryId: UniqueEntityID;
  ownerId: UniqueEntityID;
  name: string;
  location: GeometryPoint;
  status: BusinessPointStatus;
  openingHours: Record<string, any>;
  censorship: boolean;
  neighborhood: string;
  street: string;
  houseNumber: number;
  awaitingApproval?: boolean | null;
  description?: string | null;
  website?: string | null;
  highlight?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class BusinessPoint extends Entity<BusinessPointProps> {
  get categoryId() {
    return this.props.categoryId;
  }

  get ownerId() {
    return this.props.ownerId;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get location() {
    return this.props.location;
  }

  get status() {
    return this.props.status;
  }

  get openingHours() {
    return this.props.openingHours;
  }

  get website() {
    return this.props.website;
  }

  get censorship() {
    return this.props.censorship;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get street() {
    return this.props.street;
  }

  get houseNumber() {
    return this.props.houseNumber;
  }

  get awaitingApproval() {
    return this.props.awaitingApproval;
  }

  get highlight() {
    return this.props.highlight;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<BusinessPointProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    return new BusinessPoint(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }

  update(props: Partial<BusinessPointProps>): BusinessPoint {
    return new BusinessPoint(
      {
        ...this.props,
        ...props,
        updatedAt: new Date(),
      },
      this.id,
    );
  }
}
