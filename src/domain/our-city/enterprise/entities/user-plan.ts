import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entities/entity';
import { BillingCycleEnum } from './enums/billing-cycle';
import { UserPlanStatusEnum } from './enums/user-plan-status';

export interface UserPlanProps {
  userId: UniqueEntityID;
  planId: UniqueEntityID;
  status: UserPlanStatusEnum;
  billingCycle: BillingCycleEnum;
  priceAtPurchase: number;
  startDate: Date;
  endDate: Date;
  paymentReference: string;
}

export class UserPlan extends Entity<UserPlanProps> {
  get userId() {
    return this.props.userId;
  }

  get planId() {
    return this.props.planId;
  }

  get status() {
    return this.props.status;
  }

  get billingCycle() {
    return this.props.billingCycle;
  }

  get priceAtPurchase() {
    return this.props.priceAtPurchase;
  }

  get startDate() {
    return this.props.startDate;
  }

  get endDate() {
    return this.props.endDate;
  }

  get paymentReference() {
    return this.props.paymentReference;
  }

  static create(props: UserPlanProps, id?: UniqueEntityID) {
    return new UserPlan(
      {
        ...props,
        startDate: props.startDate ?? new Date(),
      },
      id,
    );
  }
}
