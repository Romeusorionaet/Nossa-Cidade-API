import {
  businessPointCustomTags,
  businessPointImages,
  sharedCategoryTags,
  businessPoints,
  businessPointToCategoriesAssociation,
  sharedBusinessPointCategories,
  SharedBusinessPointCategoriesType,
} from '../schemas';
import {
  BusinessPointProps,
  BusinessPoint,
} from 'src/domain/our-city/enterprise/entities/business-point';
import { BusinessPointRepository } from 'src/domain/our-city/application/repositories/business-point.repository';
import { BusinessPointImage } from 'src/domain/our-city/enterprise/entities/business-point-image';
import { DrizzleBusinessPointPreviewMapper } from '../mappers/drizzle-business-point-preview.mapper';
import { DrizzleBusinessPointImageMapper } from '../mappers/drizzle-business-point-image.mapper';
import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { BusinessPointPreviewType } from 'src/core/@types/business-point-preview-type';
import { DrizzleBusinessPointMapper } from '../mappers/drizzle-business-point.mapper';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { eq, sql, and, ilike, or } from 'drizzle-orm';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DrizzleBusinessPointRepository implements BusinessPointRepository {
  constructor(private drizzle: DatabaseClient) {}

  async update(
    businessPointId: string,
    businessPoint: Partial<BusinessPointProps>,
  ): Promise<void> {
    const convertedLocation = businessPoint.location
      ? {
          x: businessPoint.location.coordinates[0],
          y: businessPoint.location.coordinates[1],
        }
      : undefined;

    const data = {
      categoryId: businessPoint.categoryId?.toString(),
      name: businessPoint.name,
      location: convertedLocation,
      openingHours: businessPoint.openingHours,
      description: businessPoint.description,
      highlight: businessPoint.highlight,
      website: businessPoint.website,
      censorship: businessPoint.censorship,
      neighborhood: businessPoint.neighborhood,
      street: businessPoint.street,
      houseNumber: businessPoint.houseNumber,
    };

    await this.drizzle.database
      .update(businessPoints)
      .set(data)
      .where(eq(businessPoints.id, businessPointId));
  }

  async saveImageUrls(
    businessPointImageUrls: BusinessPointImage[],
  ): Promise<void> {
    const values = businessPointImageUrls.map(
      DrizzleBusinessPointImageMapper.toDrizzle,
    );

    await this.drizzle.database.insert(businessPointImages).values(values);
  }

  async create(businessPoint: BusinessPoint): Promise<void> {
    const db = this.drizzle.database;
    const data = DrizzleBusinessPointMapper.toDrizzle(businessPoint);

    await db.insert(businessPoints).values({
      ...data,
      location: sql`ST_SetSRID(ST_MakePoint(${data.location.x}, ${data.location.y}), 4326)`,
    });

    await db.insert(businessPointToCategoriesAssociation).values({
      businessPointCategoryId: data.categoryId,
      businessPointId: data.id,
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
        neighborhood: businessPoints.neighborhood,
        street: businessPoints.street,
        houseNumber: businessPoints.houseNumber,
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
      neighborhood: row.neighborhood,
      street: row.street,
      houseNumber: row.houseNumber,
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
        neighborhood: businessPoints.neighborhood,
        street: businessPoints.street,
        houseNumber: businessPoints.houseNumber,
        latitude: sql<number>`ST_Y(location)`,
        longitude: sql<number>`ST_X(location)`,
      })
      .from(businessPoints)
      .leftJoin(
        businessPointToCategoriesAssociation,
        eq(
          businessPoints.id,
          businessPointToCategoriesAssociation.businessPointId,
        ),
      )
      .leftJoin(
        sharedBusinessPointCategories,
        eq(
          businessPointToCategoriesAssociation.businessPointCategoryId,
          sharedBusinessPointCategories.id,
        ),
      )
      .leftJoin(
        sharedCategoryTags,
        eq(
          sharedBusinessPointCategories.id,
          sharedCategoryTags.businessPointCategoryId,
        ),
      )
      .leftJoin(
        businessPointCustomTags,
        eq(businessPoints.id, businessPointCustomTags.businessPointId),
      )
      .where(
        and(
          eq(businessPoints.awaitingApproval, false),
          or(
            ilike(
              sql<string>`unaccent(${businessPoints.name})`,
              `%${normalizedQuery}%`,
            ),
            ilike(
              sql<string>`unaccent(${sharedBusinessPointCategories.name})`,
              `%${normalizedQuery}%`,
            ),
            ilike(
              sql<string>`unaccent(${sharedCategoryTags.tag})`,
              `%${normalizedQuery}%`,
            ),
            ilike(
              sql<string>`unaccent(${businessPointCustomTags.tag})`,
              `%${normalizedQuery}%`,
            ),
          ),
        ),
      )
      .groupBy(businessPoints.id);

    return result.map((row) => ({
      id: new UniqueEntityID(row.id),
      categoryId: new UniqueEntityID(row.categoryId),
      name: row.name,
      openingHours: row.openingHours,
      neighborhood: row.neighborhood,
      street: row.street,
      houseNumber: row.houseNumber,
      location: {
        latitude: row.latitude,
        longitude: row.longitude,
      },
    }));
  }

  async findAllCategories(): Promise<SharedBusinessPointCategoriesType[]> {
    const result = await this.drizzle.database
      .select({
        id: sharedBusinessPointCategories.id,
        name: sharedBusinessPointCategories.name,
      })
      .from(sharedBusinessPointCategories);

    return result;
  }

  async findById(id: string): Promise<BusinessPoint> {
    const [result] = await this.drizzle.database
      .select()
      .from(businessPoints)
      .where(eq(businessPoints.id, id));

    return DrizzleBusinessPointMapper.toDomain(result);
  }

  async findBusinessPointsByUser(
    userId: string,
  ): Promise<BusinessPointPreviewType[]> {
    const data = await this.drizzle.database
      .select()
      .from(businessPoints)
      .where(eq(businessPoints.ownerId, userId));

    return data.map(DrizzleBusinessPointPreviewMapper.toDomain);
  }
}
