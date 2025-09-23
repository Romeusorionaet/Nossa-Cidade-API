import { UserPlanStatusEnum } from 'src/domain/our-city/enterprise/entities/enums/user-plan-status';
import { BillingCycleEnum } from 'src/domain/our-city/enterprise/entities/enums/billing-cycle';
import { UserPlan } from 'src/domain/our-city/enterprise/entities/user-plan';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { UserPlansSelectModelType } from '../schemas';

export class DrizzleUserPlanMapper {
  static toDomain(raw: UserPlansSelectModelType): UserPlan {
    const billingCycle: BillingCycleEnum = raw.billingCycle as BillingCycleEnum;
    const status: UserPlanStatusEnum = raw.billingCycle as UserPlanStatusEnum;

    return UserPlan.create(
      {
        userId: new UniqueEntityID(raw.userId),
        planId: new UniqueEntityID(raw.planId),
        status,
        paymentReference: raw.paymentReference,
        priceAtPurchase: raw.priceAtPurchase,
        billingCycle,
        endDate: raw.endDate,
        startDate: raw.startDate,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(userPlan: UserPlan): UserPlansSelectModelType {
    return {
      id: userPlan.id.toString(),
      userId: userPlan.userId.toString(),
      planId: userPlan.planId.toString(),
      status: userPlan.status,
      paymentReference: userPlan.paymentReference,
      priceAtPurchase: userPlan.priceAtPurchase,
      billingCycle: userPlan.billingCycle,
      endDate: userPlan.endDate,
      startDate: userPlan.startDate,
    };
  }
}
