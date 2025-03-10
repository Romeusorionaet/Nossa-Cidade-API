import {
  sharedServiceOptions,
  sharedAccessibility,
  sharedEnvironment,
  sharedAmenities,
  sharedAudience,
  sharedPayments,
  sharedPlanning,
  sharedParking,
  sharedMenu,
  sharedPets,
} from '../schemas';
import { SharedItemRepository } from 'src/domain/our-city/application/repositories/shared-item.repository';
import { GetSharedItemsType } from 'src/core/@types/get-shared-items-type';
import { DatabaseClient } from '../database.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DrizzleSharedItemRepository implements SharedItemRepository {
  constructor(private drizzle: DatabaseClient) {}
  async findAll(): Promise<GetSharedItemsType> {
    const sharedPetsItems = await this.drizzle.database
      .select()
      .from(sharedPets);
    const sharedPlanningItems = await this.drizzle.database
      .select()
      .from(sharedPlanning);
    const sharedAccessibilityItems = await this.drizzle.database
      .select()
      .from(sharedAccessibility);
    const sharedParkingItems = await this.drizzle.database
      .select()
      .from(sharedParking);
    const sharedPaymentsItems = await this.drizzle.database
      .select()
      .from(sharedPayments);
    const sharedAudienceItems = await this.drizzle.database
      .select()
      .from(sharedAudience);
    const sharedAmenitiesItems = await this.drizzle.database
      .select()
      .from(sharedAmenities);
    const sharedMenuItems = await this.drizzle.database
      .select()
      .from(sharedMenu);
    const sharedServiceOptionsItems = await this.drizzle.database
      .select()
      .from(sharedServiceOptions);
    const sharedEnvironmentItems = await this.drizzle.database
      .select()
      .from(sharedEnvironment);

    const allItems: GetSharedItemsType = {
      pets: sharedPetsItems,
      planning: sharedPlanningItems,
      accessibility: sharedAccessibilityItems,
      parking: sharedParkingItems,
      payments: sharedPaymentsItems,
      audience: sharedAudienceItems,
      amenities: sharedAmenitiesItems,
      menu: sharedMenuItems,
      serviceOptions: sharedServiceOptionsItems,
      environments: sharedEnvironmentItems,
    };

    return allItems;
  }
}
