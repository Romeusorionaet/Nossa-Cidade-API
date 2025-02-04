import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';
import { BusinessPoint } from 'src/domain/our-city/enterprise/entities/business-point';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { GeometryPoint } from 'src/core/@types/geometry';
import { BusinessPointInsertType } from '../schemas';

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
    const images: Record<string, any> = raw.images as Record<string, any>;
    const tags: string[] = raw.tags as string[];

    return BusinessPoint.create(
      {
        categoryId: new UniqueEntityID(raw.categoryId),
        ownerId: new UniqueEntityID(raw.ownerId),
        name: raw.name,
        location: location,
        status,
        openingHours,
        censorship: raw.censorship,
        description: raw.description || null,
        images: images || null,
        website: raw.website || null,
        tags: tags || null,
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
      location: {
        x: businessPoint.location.coordinates[0],
        y: businessPoint.location.coordinates[1],
      },
      status: businessPoint.status,
      openingHours: businessPoint.openingHours,
      censorship: businessPoint.censorship,
      description: businessPoint.description,
      images: businessPoint.images,
      website: businessPoint.website,
      tags: businessPoint.tags,
      highlight: businessPoint.highlight,
      updatedAt: businessPoint.updatedAt,
      createdAt: businessPoint.createdAt,
    };
  }
}
