import {
  businessPointCustomTags,
  sharedCategoryTags,
  businessPoints,
  businessPointToCategoriesAssociation,
  sharedBusinessPointCategories,
  SharedBusinessPointCategoriesType,
  products,
  businessPointDrafts,
  businessPointStatusEnum,
} from '../schemas';
import { BusinessPoint } from 'src/domain/our-city/enterprise/entities/business-point';
import { BusinessPointRepository } from 'src/domain/our-city/application/repositories/business-point.repository';
import { DrizzleBusinessPointPreviewMapper } from '../mappers/drizzle-business-point-preview.mapper';
import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { BusinessPointPreviewType } from 'src/core/@types/business-point-preview-type';
import { DrizzleBusinessPointMapper } from '../mappers/drizzle-business-point.mapper';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { eq, sql, and, ilike, or, getTableColumns } from 'drizzle-orm';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { SearchableText } from 'src/domain/our-city/enterprise/value-objects/searchable-text';

@Injectable()
export class DrizzleBusinessPointRepository implements BusinessPointRepository {
  constructor(private drizzle: DatabaseClient) {}
  async toggleActive(businessPoint: BusinessPoint) {
    const data = DrizzleBusinessPointMapper.toDrizzle(businessPoint);

    await this.drizzle.database
      .update(businessPoints)
      .set(data)
      .where(eq(businessPoints.id, data.id));
  }

  async update(businessPoint: BusinessPoint): Promise<void> {
    const data = DrizzleBusinessPointMapper.toDrizzle(businessPoint);

    await this.drizzle.database
      .update(businessPoints)
      .set(data)
      .where(eq(businessPoints.id, data.id));
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
      .where(
        and(
          eq(businessPoints.awaitingApproval, false),
          eq(businessPoints.status, businessPointStatusEnum.enumValues[0]),
        ),
      );

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
    const normalizedQuery = SearchableText.createFromText(query).value;
    const likePattern = `%${normalizedQuery}%`;

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
      .leftJoin(products, eq(products.businessPointId, businessPoints.id))
      .where(
        and(
          eq(businessPoints.awaitingApproval, false),
          or(
            ilike(businessPoints.searchName, likePattern),
            ilike(sharedBusinessPointCategories.searchName, likePattern),
            ilike(sharedCategoryTags.tag, likePattern),
            ilike(businessPointCustomTags.tag, likePattern),
            ilike(products.searchTitle, likePattern),
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
      .select()
      .from(sharedBusinessPointCategories);

    return result;
  }

  async findById(id: string): Promise<BusinessPoint | null> {
    const [result] = await this.drizzle.database
      .select()
      .from(businessPoints)
      .where(eq(businessPoints.id, id));

    if (!result) {
      return null;
    }

    return DrizzleBusinessPointMapper.toDomain(result);
  }

  async findBusinessPointsByUser(
    userId: string,
  ): Promise<BusinessPointPreviewType[]> {
    const data = await this.drizzle.database
      .select({
        ...getTableColumns(businessPoints),
        hasPendingDraft: sql<boolean>`CASE 
        WHEN ${businessPointDrafts.id} IS NOT NULL THEN true 
        ELSE false 
      END`,
      })
      .from(businessPoints)
      .leftJoin(
        businessPointDrafts,
        and(eq(businessPoints.id, businessPointDrafts.businessPointId)),
      )
      .where(eq(businessPoints.ownerId, userId));

    return data.map(DrizzleBusinessPointPreviewMapper.toDomain);
  }
}
