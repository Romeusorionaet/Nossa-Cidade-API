import { UserPlan } from '../../enterprise/entities/user-plan';

export abstract class UserPlansRepository {
  abstract create(userPlan: UserPlan): Promise<void>;
}
