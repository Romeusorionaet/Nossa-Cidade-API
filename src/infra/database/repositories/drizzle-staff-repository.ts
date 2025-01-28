import { StaffRepository } from 'src/domain/our-city/application/repositories/staff-repository';
import { Staff } from 'src/domain/our-city/enterprise/entities/staff';
import { DrizzleStaffMapper } from '../mappers/drizzle-staff-mapper';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { staff } from '../schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleStaffRepository implements StaffRepository {
  constructor(private drizzle: DatabaseClient) {}
  async findByUserId(id: string): Promise<Staff | null> {
    const [data] = await this.drizzle.database
      .select()
      .from(staff)
      .where(eq(staff.userId, id));

    if (!data) {
      return null;
    }
    return DrizzleStaffMapper.toDomain(data);
  }
}
