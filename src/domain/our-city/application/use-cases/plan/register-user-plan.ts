import { Either, left, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { UserPlansRepository } from '../../repositories/user-plans.repository';
import { UserPlan } from 'src/domain/our-city/enterprise/entities/user-plan';
import { BillingCycleEnum } from 'src/domain/our-city/enterprise/entities/enums/billing-cycle';
import { UserPlanStatusEnum } from 'src/domain/our-city/enterprise/entities/enums/user-plan-status';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { calculateEndDate } from '../../utils/calculate-end-date';
import { PlansRepository } from '../../repositories/plans.repository';
import { PlanNotFoundError } from '../errors/plan-not-found-error';

interface RegisterUserPlanUseCaseRequest {
  planId: string;
  userId: string;
  billingCycle: BillingCycleEnum;
  startDate: Date;
  paymentReference: string;
}

type RegisterUserPlanUseCaseResponse = Either<PlanNotFoundError, object>;

@Injectable()
export class RegisterUserPlanUseCase {
  constructor(
    private userPlansRepository: UserPlansRepository,
    private plansRepository: PlansRepository,
  ) {}

  async execute({
    planId,
    userId,
    billingCycle,
    startDate,
    paymentReference,
  }: RegisterUserPlanUseCaseRequest): Promise<RegisterUserPlanUseCaseResponse> {
    const plan = await this.plansRepository.findById(planId);

    if (!plan) {
      return left(new PlanNotFoundError());
    }

    const endDate = calculateEndDate({ billingCycle, startDate });

    const userPlan = UserPlan.create({
      planId: new UniqueEntityID(planId),
      userId: new UniqueEntityID(userId),
      billingCycle,
      status: UserPlanStatusEnum.ACTIVE,
      priceAtPurchase: plan.price,
      startDate,
      endDate,
      paymentReference,
    });

    await this.userPlansRepository.create(userPlan);

    return right({});
  }
}
