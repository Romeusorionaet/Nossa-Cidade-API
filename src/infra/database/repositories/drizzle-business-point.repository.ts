import type { BusinessPointRepository } from 'src/domain/our-city/application/repositories/business-point.repository';
import type { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import type {
  BusinessPoint,
  BusinessPointProps,
} from 'src/domain/our-city/enterprise/entities/business-point';
import { DrizzleBusinessPointMapper } from '../mappers/drizzle-business-point.mapper';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import type { GeometryPoint } from 'src/core/@types/geometry';
import type { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import {
  businessPointCategories,
  type BusinessPointCategoriesInsertType,
  businessPoints,
} from '../schemas';
import { eq, sql, and, ilike, or } from 'drizzle-orm';

@Injectable()
export class DrizzleBusinessPointRepository implements BusinessPointRepository {
  constructor(private drizzle: DatabaseClient) {}

  async create(businessPoint: BusinessPoint): Promise<void> {
    const data = DrizzleBusinessPointMapper.toDrizzle(businessPoint);

    await this.drizzle.database.insert(businessPoints).values({
      ...data,
      location: sql`ST_SetSRID(ST_MakePoint(${data.location.x}, ${data.location.y}), 4326)`,
    });
  }
  async findByCoordinate(
    location: GeometryPoint,
  ): Promise<BusinessPoint | null> {
    const [businessPoint] = await this.drizzle.database
      .select()
      .from(businessPoints).where(sql`
        ST_DWithin(
          location, 
          ST_Transform(ST_SetSRID(ST_MakePoint(${location.coordinates[0]}, ${location.coordinates[1]}), 4326), 4326),
          0
        )
      `);

    if (!businessPoint) {
      return null;
    }

    return DrizzleBusinessPointMapper.toDomain(businessPoint);
  }

  async findAllForMapping(): Promise<BusinessPointForMappingType[]> {
    const result = await this.drizzle.database
      .select({
        id: businessPoints.id,
        name: businessPoints.name,
        categoryId: businessPoints.categoryId,
        openingHours: businessPoints.openingHours,
        latitude: sql<number>`ST_Y(location)`,
        longitude: sql<number>`ST_X(location)`,
      })
      .from(businessPoints)
      .where(eq(businessPoints.awaitingApproval, false));

    return result.map((row) => ({
      id: new UniqueEntityID(row.id),
      categoryId: new UniqueEntityID(row.categoryId),
      name: row.name,
      openingHours: row.openingHours,
      location: {
        latitude: row.latitude,
        longitude: row.longitude,
      },
    }));
  }

  async findByQuery(query: string): Promise<BusinessPointForMappingType[]> {
    const removeAccents = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const normalizedQuery = removeAccents(query).toLowerCase();

    const result = await this.drizzle.database
      .select({
        id: businessPoints.id,
        categoryId: businessPoints.categoryId,
        name: businessPoints.name,
        openingHours: businessPoints.openingHours,
        latitude: sql<number>`ST_Y(location)`,
        longitude: sql<number>`ST_X(location)`,
      })
      .from(businessPoints)
      .where(
        and(
          eq(businessPoints.awaitingApproval, false),
          or(
            ilike(
              sql<string>`unaccent(${businessPoints.name})`,
              `%${normalizedQuery}%`,
            ),
            sql<boolean>`${normalizedQuery} ILIKE ANY(
              SELECT unaccent(jsonb_array_elements_text(${businessPoints.tags}))
            )`,
          ),
        ),
      );

    return result.map((row) => ({
      id: new UniqueEntityID(row.id),
      categoryId: new UniqueEntityID(row.categoryId),
      name: row.name,
      openingHours: row.openingHours,
      location: {
        latitude: row.latitude,
        longitude: row.longitude,
      },
    }));
  }

  async findAllCategories(): Promise<BusinessPointCategoriesInsertType[]> {
    const result = await this.drizzle.database
      .select({
        id: businessPointCategories.id,
        name: businessPointCategories.name,
      })
      .from(businessPointCategories);

    return result;
  }

  async findById(id: string): Promise<BusinessPointProps> {
    const [result] = await this.drizzle.database
      .select()
      .from(businessPoints)
      .where(eq(businessPoints.id, id));

    return DrizzleBusinessPointMapper.toDomain(result);
  }
}
