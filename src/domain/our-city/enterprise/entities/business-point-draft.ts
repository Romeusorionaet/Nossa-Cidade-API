import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { DraftStatus } from './enums/draft-status';
import { Entity } from 'src/core/entities/entity';

export interface BusinessPointDraftProps {
  categoryId: UniqueEntityID;
  businessPointId: UniqueEntityID;
  name: string;
  location: GeometryPoint;
  openingHours: Record<string, any>;
  censorship: boolean;
  description: string;
  website: string;
  highlight: string;
  status: DraftStatus;
  neighborhood: string;
  street: string;
  houseNumber: number;
}

export class BusinessPointDraft extends Entity<BusinessPointDraftProps> {
  get categoryId() {
    return this.props.categoryId;
  }

  get businessPointId() {
    return this.props.businessPointId;
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

  get openingHours() {
    return this.props.openingHours;
  }

  get website() {
    return this.props.website;
  }

  get censorship() {
    return this.props.censorship;
  }

  get highlight() {
    return this.props.highlight;
  }

  get status() {
    return this.props.status;
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

  static create(props: BusinessPointDraftProps, id?: UniqueEntityID) {
    return new BusinessPointDraft(props, id);
  }
}
