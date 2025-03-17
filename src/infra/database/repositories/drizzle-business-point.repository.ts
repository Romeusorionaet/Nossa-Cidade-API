import {
  businessPointCategoriesAssociation,
  BusinessPointCategoriesInsertType,
  businessPointCategories,
  businessPointCustomTags,
  sharedCategoryTags,
  businessPoints,
} from '../schemas';
import {
  BusinessPoint,
  BusinessPointProps,
} from 'src/domain/our-city/enterprise/entities/business-point';
import { BUSINESS_POINT_ASSOCIATIONS } from 'src/domain/our-city/application/shared/constants/business-point-associations';
import { BusinessPointRepository } from 'src/domain/our-city/application/repositories/business-point.repository';
import { DrizzleBusinessPointPreviewMapper } from '../mappers/drizzle-business-point-preview.mapper';
import { GetBusinessPointDetailsType } from 'src/core/@types/get-business-point-details-type';
import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { BusinessPointDetailsType } from 'src/core/@types/business-point-details-type';
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

  async create(businessPoint: BusinessPoint): Promise<void> {
    const db = this.drizzle.database;
    const data = DrizzleBusinessPointMapper.toDrizzle(businessPoint);

    await db.insert(businessPoints).values({
      ...data,
      location: sql`ST_SetSRID(ST_MakePoint(${data.location.x}, ${data.location.y}), 4326)`,
    });

    await db.insert(businessPointCategoriesAssociation).values({
      businessPointCategoryId: data.categoryId,
      businessPointId: data.id,
    });
  }

  async addDetails(
    businessPointDetails: BusinessPointDetailsType,
  ): Promise<void> {
    await this.drizzle.database.transaction(async (trx) => {
      for (const { key, table, column } of BUSINESS_POINT_ASSOCIATIONS) {
        const values = businessPointDetails[
          key as keyof BusinessPointDetailsType
        ] as string[];

        if (values.length > 0) {
          await trx.insert(table).values(
            values.map((sharedId) => ({
              businessPointId: businessPointDetails.businessPointId,
              [column]: sharedId,
            })),
          );
        }
      }
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
        address: businessPoints.address,
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
      address: row.address,
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
        address: businessPoints.address,
        openingHours: businessPoints.openingHours,
        latitude: sql<number>`ST_Y(location)`,
        longitude: sql<number>`ST_X(location)`,
      })
      .from(businessPoints)
      .leftJoin(
        businessPointCategoriesAssociation,
        eq(
          businessPoints.id,
          businessPointCategoriesAssociation.businessPointId,
        ),
      )
      .leftJoin(
        businessPointCategories,
        eq(
          businessPointCategoriesAssociation.businessPointCategoryId,
          businessPointCategories.id,
        ),
      )
      .leftJoin(
        sharedCategoryTags,
        eq(
          businessPointCategories.id,
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
              sql<string>`unaccent(${businessPointCategories.name})`,
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
      address: row.address,
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

  async findDetailsById(id: string): Promise<GetBusinessPointDetailsType> {
    const result = await this.drizzle.database.execute(
      sql`
         SELECT 
      DISTINCT ON (bp.id) 
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT sp.name), NULL) AS "pets",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT spl.name), NULL) AS "planning",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT sa.name), NULL) AS "accessibility",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT spk.name), NULL) AS "parking",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT spp.name), NULL) AS "payments",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT sau.name), NULL) AS "audience",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT sam.name), NULL) AS "amenities",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT sm.name), NULL) AS "menu",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT sso.name), NULL) AS "serviceOptions",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT se.name), NULL) AS "environment",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT bpc.name), NULL) AS "categories"
    FROM business_points bp
    LEFT JOIN business_point_to_pets_association bpa ON bp.id = bpa.business_point_id
    LEFT JOIN pets sp ON bpa.pets_id = sp.id
    LEFT JOIN business_point_to_planning_association bpp ON bp.id = bpp.business_point_id
    LEFT JOIN planning spl ON bpp.planning_id = spl.id
    LEFT JOIN business_point_to_accessibility_association bpa2 ON bp.id = bpa2.business_point_id
    LEFT JOIN accessibility sa ON bpa2.accessibility_id = sa.id
    LEFT JOIN business_point_to_parking_association bppk ON bp.id = bppk.business_point_id
    LEFT JOIN parking spk ON bppk.parking_id = spk.id
    LEFT JOIN business_point_to_payment_association bppp ON bp.id = bppp.business_point_id
    LEFT JOIN payments spp ON bppp.payments_id = spp.id
    LEFT JOIN business_point_to_audience_association bpa3 ON bp.id = bpa3.business_point_id
    LEFT JOIN audience sau ON bpa3.audience_id = sau.id
    LEFT JOIN business_point_to_amenities_association bpa4 ON bp.id = bpa4.business_point_id
    LEFT JOIN amenities sam ON bpa4.amenities_id = sam.id
    LEFT JOIN business_point_to_menu_association bpm ON bp.id = bpm.business_point_id
    LEFT JOIN menu sm ON bpm.menu_id = sm.id
    LEFT JOIN business_point_to_service_option_association bps ON bp.id = bps.business_point_id
    LEFT JOIN service_options sso ON bps.service_option_id = sso.id
    LEFT JOIN business_point_to_environment_association bpe ON bp.id = bpe.business_point_id
    LEFT JOIN environment se ON bpe.environment_id = se.id
    LEFT JOIN business_point_categories_association bpca ON bp.id = bpca.business_point_id
    LEFT JOIN business_point_categories bpc ON bpca.business_point_category_id = bpc.id
    WHERE bp.id = ${id}
    GROUP BY bp.id;
  `,
    );

    const [formattedResult]: GetBusinessPointDetailsType[] = (
      result as { [key: string]: unknown }[]
    ).map((item) => {
      return item as GetBusinessPointDetailsType;
    });

    return formattedResult;
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
