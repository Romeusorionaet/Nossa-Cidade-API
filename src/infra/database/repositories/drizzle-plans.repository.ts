import { PlansRepository } from 'src/domain/our-city/application/repositories/plans.repository';
import { Plan } from 'src/domain/our-city/enterprise/entities/plan';
import { DrizzlePlanMapper } from '../mappers/drizzle-plan.mapper';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { plans } from '../schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzlePlansRepository implements PlansRepository {
  constructor(private drizzle: DatabaseClient) {}

  async findById(planId: string): Promise<Plan | null> {
    const [data] = await this.drizzle.database
      .select()
      .from(plans)
      .where(eq(plans.id, planId));

    if (!data) {
      return null;
    }

    return DrizzlePlanMapper.toDomain(data);
  }
}
