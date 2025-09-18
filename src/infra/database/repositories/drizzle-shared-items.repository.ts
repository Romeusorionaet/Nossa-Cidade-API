import { SharedItemsRepository } from 'src/domain/our-city/application/repositories/shared-items.repository';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { SHARED_ITEM_TABLES_MAPPING } from '../mappings/shared-item-tables.mapping';
import { DrizzleSharedItemsMapper } from '../mappers/drizzle-shared-items.mapper';
import { SharedItemsType } from 'src/core/@types/shared-items-type';
import { SharedItem } from 'src/domain/our-city/enterprise/entities/shared-item';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleSharedItemsRepository implements SharedItemsRepository {
  constructor(private drizzle: DatabaseClient) {}

  async findUnique(sharedId: string): Promise<SharedItem | null> {
    for (const [_, table] of Object.entries(SHARED_ITEM_TABLES_MAPPING)) {
      const results = await this.drizzle.database
        .select({ id: table.id, name: table.name })
        .from(table)
        .where(eq(table.id, sharedId));

      const item = results.map(DrizzleSharedItemsMapper.toDomain)[0];
      if (item) return item;
    }

    return null;
  }

  async create(data: Partial<SharedItemsType>): Promise<void> {
    for (const key of Object.keys(data) as (keyof SharedItemsType)[]) {
      const items = data[key];
      if (!items || items.length === 0) continue;

      for (const item of items) {
        const drizzleItem = DrizzleSharedItemsMapper.toDrizzle(item);

        await this.drizzle.database
          .insert(SHARED_ITEM_TABLES_MAPPING[key])
          .values(drizzleItem);
      }
    }
  }

  async findAll(): Promise<SharedItemsType> {
    const results = await Promise.all(
      Object.entries(SHARED_ITEM_TABLES_MAPPING).map(([_, table]) =>
        this.drizzle.database
          .select({ id: table.id, name: table.name })
          .from(table),
      ),
    );

    const mappedResults = results.map((tableResults) =>
      tableResults.map(DrizzleSharedItemsMapper.toDomain),
    );

    const allItems = Object.keys(SHARED_ITEM_TABLES_MAPPING).reduce(
      (acc, key, index) => {
        acc[key as keyof SharedItemsType] = mappedResults[index];
        return acc;
      },
      {} as SharedItemsType,
    );

    return allItems;
  }
}
