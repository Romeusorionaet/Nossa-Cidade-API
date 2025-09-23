import { Plan } from '../../enterprise/entities/plan';

export abstract class PlansRepository {
  abstract findById(planId: string): Promise<Plan | null>;
}
