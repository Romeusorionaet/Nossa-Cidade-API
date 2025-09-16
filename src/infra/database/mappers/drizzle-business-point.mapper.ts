import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';
import { BusinessPoint } from 'src/domain/our-city/enterprise/entities/business-point';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { BusinessPointInsertType } from '../schemas';
import { SearchableText } from 'src/domain/our-city/enterprise/value-objects/searchable-text';

export class DrizzleBusinessPointMapper {
  static toDomain(raw: BusinessPointInsertType): BusinessPoint {
    const location: GeometryPoint = {
      type: 'Point',
      coordinates: [raw.location.x, raw.location.y],
    };
    const status: BusinessPointStatus = raw.status as BusinessPointStatus;
    const openingHours: Record<string, any> = raw.openingHours as Record<
      string,
      any
    >;

    return BusinessPoint.create(
      {
        categoryId: new UniqueEntityID(raw.categoryId),
        ownerId: new UniqueEntityID(raw.ownerId),
        name: raw.name,
        searchName: SearchableText.createFromText(raw.searchName),
        location: location,
        status,
        openingHours,
        censorship: raw.censorship,
        neighborhood: raw.neighborhood,
        street: raw.street,
        houseNumber: raw.houseNumber,
        awaitingApproval: raw.awaitingApproval,
        description: raw.description || null,
        website: raw.website || null,
        highlight: raw.highlight || null,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(businessPoint: BusinessPoint): BusinessPointInsertType {
    return {
      id: businessPoint.id.toString(),
      categoryId: businessPoint.categoryId.toString(),
      ownerId: businessPoint.ownerId.toString(),
      name: businessPoint.name,
      searchName: businessPoint.searchName.value,
      location: {
        x: businessPoint.location.coordinates[0],
        y: businessPoint.location.coordinates[1],
      },
      status: businessPoint.status,
      openingHours: businessPoint.openingHours,
      censorship: businessPoint.censorship,
      awaitingApproval: businessPoint.awaitingApproval,
      description: businessPoint.description,
      website: businessPoint.website,
      highlight: businessPoint.highlight,
      neighborhood: businessPoint.neighborhood,
      street: businessPoint.street,
      houseNumber: businessPoint.houseNumber,
      updatedAt: businessPoint.updatedAt,
      createdAt: businessPoint.createdAt,
    };
  }
}
