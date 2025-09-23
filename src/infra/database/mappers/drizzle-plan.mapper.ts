import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { PlansSelectModelType } from '../schemas';
import { Plan } from 'src/domain/our-city/enterprise/entities/plan';
import { PlanEnum } from 'src/domain/our-city/enterprise/entities/enums/plan';

export class DrizzlePlanMapper {
  static toDomain(raw: PlansSelectModelType): Plan {
    const name: PlanEnum = raw.name as PlanEnum;

    return Plan.create(
      {
        features: raw.features,
        price: raw.price,
        name,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(plan: Plan): PlansSelectModelType {
    return {
      id: plan.id.toString(),
      features: plan.features,
      name: plan.name,
      price: plan.price,
    };
  }
}
