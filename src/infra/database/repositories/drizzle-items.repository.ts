import { SharedItemsRepository } from 'src/domain/our-city/application/repositories/shared-items.repository';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';
import { SharedItemsType } from 'src/core/@types/get-shared-items-type';
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

@Injectable()
export class DrizzleSharedItemsAssociationRepository
  implements SharedItemsRepository
{
  constructor(private drizzle: DatabaseClient) {}
  async findAll(): Promise<SharedItemsType> {
    const tables = [
      { key: 'pets', table: sharedPets },
      { key: 'planning', table: sharedPlanning },
      { key: 'accessibility', table: sharedAccessibility },
      { key: 'parking', table: sharedParking },
      { key: 'payments', table: sharedPayments },
      { key: 'audience', table: sharedAudience },
      { key: 'amenities', table: sharedAmenities },
      { key: 'menu', table: sharedMenu },
      { key: 'serviceOptions', table: sharedServiceOptions },
      { key: 'environments', table: sharedEnvironment },
      { key: 'categories', table: sharedBusinessPointCategories },
    ];

    const results = await Promise.all(
      tables.map(({ table }) => this.drizzle.database.select().from(table)),
    );

    const allItems = tables.reduce((acc, { key }, index) => {
      acc[key] = results[index];
      return acc;
    }, {} as SharedItemsType);

    return allItems;
  }
}
