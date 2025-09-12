import { SharedItemsAssociateKeysEnum } from 'src/domain/our-city/application/shared/enums/shared-items-associate-keys.enum';
import { BUSINESS_POINT_ASSOCIATIONS } from 'src/domain/our-city/application/shared/constants/business-point-associations';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { SharedAssociationRepository } from 'src/domain/our-city/application/repositories/shared-association.repository';
import { SharedItemsType } from 'src/core/@types/shared-items-type';
import {
  sharedAccessibility,
  sharedAmenities,
  sharedAudience,
  sharedBusinessPointCategories,
  sharedEnvironment,
  sharedMenu,
  sharedParking,
  sharedPayments,
  sharedPets,
  sharedPlanning,
  sharedServiceOptions,
} from '../schemas';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { SharedItem } from 'src/domain/our-city/enterprise/entities/shared-item';
import { SHARED_ITEMS_ASSOCIATIONS } from '../mappings/shared-items-associated.mapping';

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
    const TABLES: Record<string, any> = {
      pets: sharedPets,
      planning: sharedPlanning,
      accessibility: sharedAccessibility,
      parking: sharedParking,
      payments: sharedPayments,
      audience: sharedAudience,
      amenities: sharedAmenities,
      menu: sharedMenu,
      service_options: sharedServiceOptions,
      environment: sharedEnvironment,
      business_point_categories: sharedBusinessPointCategories,
    };

    const fetchAssociation = async (
      tableName: keyof typeof TABLES,
      joinTableName: string,
      joinColumn: string,
    ) => {
      const table = TABLES[tableName];
      if (!table) throw new Error(`Tabela "${tableName}" não existe no TABLES`);

      const result = await this.drizzle.database
        .select({ id: table.id, name: table.name })
        .from(table)
        .leftJoin(
          sql`${sql.identifier(joinTableName)}`,
          eq(
            table.id,
            sql`${sql.identifier(joinTableName)}.${sql.identifier(joinColumn)}`,
          ),
        )
        .where(eq(sql`${sql.identifier(joinTableName)}.business_point_id`, id));

      return result.map((r) =>
        SharedItem.create({ name: r.name }, new UniqueEntityID(r.id)),
      );
    };

    const results = await Promise.all(
      SHARED_ITEMS_ASSOCIATIONS.map(({ key, joinTable, joinColumn }) =>
        fetchAssociation(key, joinTable, joinColumn),
      ),
    );

    const [
      pets,
      planning,
      accessibility,
      parking,
      payments,
      audience,
      amenities,
      menu,
      serviceOptions,
      environments,
      categories,
    ] = results;

    return {
      pets,
      planning,
      accessibility,
      parking,
      payments,
      audience,
      amenities,
      menu,
      serviceOptions,
      environments,
      categories,
    };
  }
}
