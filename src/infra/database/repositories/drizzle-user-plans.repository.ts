import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { UserPlansRepository } from 'src/domain/our-city/application/repositories/user-plans.repository';
import { UserPlan } from 'src/domain/our-city/enterprise/entities/user-plan';
import { userPlans } from '../schemas';
import { DrizzleUserPlanMapper } from '../mappers/drizzle-user-plan.mapper';

@Injectable()
export class DrizzleUserPlansRepository implements UserPlansRepository {
  constructor(private drizzle: DatabaseClient) {}

  async create(userPlan: UserPlan): Promise<void> {
    const data = DrizzleUserPlanMapper.toDrizzle(userPlan);

    await this.drizzle.database.insert(userPlans).values(data);
  }
}
