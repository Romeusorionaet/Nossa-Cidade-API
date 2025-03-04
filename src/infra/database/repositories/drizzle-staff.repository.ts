import { StaffRepository } from 'src/domain/our-city/application/repositories/staff.repository';
import { Staff } from 'src/domain/our-city/enterprise/entities/staff';
import { DrizzleStaffMapper } from '../mappers/drizzle-staff.mapper';
import { DatabaseClient } from '../database.client';
import { staff, usersRoleEnum } from '../schemas';
import { Injectable } from '@nestjs/common';
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

  async addUserToStaff(id: string): Promise<void> {
    await this.drizzle.database
      .insert(staff)
      .values({ role: usersRoleEnum.enumValues[1], userId: id });
  }
}
