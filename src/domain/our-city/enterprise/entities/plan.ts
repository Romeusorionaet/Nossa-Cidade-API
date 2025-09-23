import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entities/entity';
import { PlanEnum } from './enums/plan';

export interface PlanProps {
  name: PlanEnum;
  price: number;
  features: Record<string, any>;
}

export class Plan extends Entity<PlanProps> {
  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  get features() {
    return this.props.features;
  }

  static create(props: PlanProps, id?: UniqueEntityID) {
    return new Plan(props, id);
  }
}
