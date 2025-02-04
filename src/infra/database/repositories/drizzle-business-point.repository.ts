import { BusinessPointRepository } from 'src/domain/our-city/application/repositories/business-point.repository';
import { BusinessPoint } from 'src/domain/our-city/enterprise/entities/business-point';
import { DrizzleBusinessPointMapper } from '../mappers/drizzle-business-point.mapper';
import { GeometryPoint } from 'src/core/@types/geometry';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { businessPoints } from '../schemas';
import { sql } from 'drizzle-orm';

@Injectable()
export class DrizzleBusinessPointRepository implements BusinessPointRepository {
  constructor(private drizzle: DatabaseClient) {}
  async create(businessPoint: BusinessPoint): Promise<void> {
    const data = DrizzleBusinessPointMapper.toDrizzle(businessPoint);

    await this.drizzle.database.insert(businessPoints).values(data);
  }
  async findByCoordinate(
    location: GeometryPoint,
  ): Promise<BusinessPoint | null> {
    const [businessPoint] = await this.drizzle.database
      .select()
      .from(businessPoints).where(sql`
        ST_Equals(location, ST_SetSRID(ST_MakePoint(${location.coordinates[0]}, ${location.coordinates[1]}), 4326))
      `);

    if (!businessPoint) {
      return null;
    }

    return DrizzleBusinessPointMapper.toDomain(businessPoint);
  }
}
