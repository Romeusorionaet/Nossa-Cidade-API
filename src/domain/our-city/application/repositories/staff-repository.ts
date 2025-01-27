import { Staff } from '../../enterprise/entities/staff';

export abstract class StaffRepository {
  abstract findByUserId(id: string): Promise<Staff | null>;
}
