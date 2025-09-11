import { SharedItemsAssociateKeysEnum } from 'src/domain/our-city/application/shared/enums/shared-items-associate-keys.enum';
import { BUSINESS_POINT_ASSOCIATIONS } from 'src/domain/our-city/application/shared/constants/business-point-associations';
import { SharedItemsType } from 'src/core/@types/get-shared-items-type';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { SharedAssociationRepository } from 'src/domain/our-city/application/repositories/shared-association.repository';

@Injectable()
export class DrizzleSharedAssociationRepository
  implements SharedAssociationRepository
{
  constructor(private drizzle: DatabaseClient) {}
  async remove(
    removedListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>,
    businessPointId: string,
  ): Promise<void> {
    await this.drizzle.database.transaction(async (trx) => {
      for (const { key, table, column } of BUSINESS_POINT_ASSOCIATIONS) {
        const values = removedListItems[key as keyof typeof removedListItems];

        if (Array.isArray(values) && values.length > 0) {
          for (const value of values) {
            await trx
              .delete(table)
              .where(
                sql`${table.businessPointId} = ${businessPointId} AND ${table[column]} = ${value}`,
              );
          }
        }
      }
    });
  }

  async update(
    newListItems: Partial<Record<SharedItemsAssociateKeysEnum, string[]>>,
    businessPointId: string,
  ): Promise<void> {
    await this.drizzle.database.transaction(async (trx) => {
      for (const { key, table, column } of BUSINESS_POINT_ASSOCIATIONS) {
        const values = newListItems[
          key as keyof typeof newListItems
        ] as string[];

        if (Array.isArray(values) && values.length > 0) {
          await trx.insert(table).values(
            values.map((sharedId) => ({
              businessPointId,
              [column]: sharedId,
            })),
          );
        }
      }
    });
  }

  async findAll(id: string): Promise<SharedItemsType> {
    const result = await this.drizzle.database.execute(
      sql`
           SELECT 
        DISTINCT ON (bp.id) 
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', se.id, 'name', se.name) AS TEXT))::JSON[] AS "environments",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', sa.id, 'name', sa.name) AS TEXT))::JSON[] AS "accessibility",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', sp.id, 'name', sp.name) AS TEXT))::JSON[] AS "pets",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', spl.id, 'name', spl.name) AS TEXT))::JSON[] AS "planning",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', spk.id, 'name', spk.name) AS TEXT))::JSON[] AS "parking",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', spp.id, 'name', spp.name) AS TEXT))::JSON[] AS "payments",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', sau.id, 'name', sau.name) AS TEXT))::JSON[] AS "audience",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', sam.id, 'name', sam.name) AS TEXT))::JSON[] AS "amenities",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', sm.id, 'name', sm.name) AS TEXT))::JSON[] AS "menu",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', sso.id, 'name', sso.name) AS TEXT))::JSON[] AS "serviceOptions",
        ARRAY_AGG(DISTINCT CAST(JSON_BUILD_OBJECT('id', bpc.id, 'name', bpc.name) AS TEXT))::JSON[] AS "categories"
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
      LEFT JOIN business_point_to_categories_association bpca ON bp.id = bpca.business_point_id
      LEFT JOIN business_point_categories bpc ON bpca.business_point_category_id = bpc.id
      WHERE bp.id = ${id}
      GROUP BY bp.id;
    `,
    );

    const [formattedResult]: SharedItemsType[] = (
      result as { [key: string]: unknown }[]
    ).map((item) => {
      return item as SharedItemsType;
    });

    return formattedResult;
  }
}
