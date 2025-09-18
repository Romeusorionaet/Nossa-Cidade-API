import { BusinessPointDraft } from 'src/domain/our-city/enterprise/entities/business-point-draft';
import { DraftStatus } from 'src/domain/our-city/enterprise/entities/enums/draft-status';
import { BusinessPointDraftSelectType } from '../schemas/drafts.schema';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export class DrizzleBusinessPointDraftMapper {
  static toDomain(raw: BusinessPointDraftSelectType): BusinessPointDraft {
    const location: GeometryPoint = {
      type: 'Point',
      coordinates: [raw.location?.x, raw.location?.y],
    };
    const status: DraftStatus = raw.status as DraftStatus;
    const openingHours: Record<string, any> = raw.openingHours as Record<
      string,
      any
    >;

    return BusinessPointDraft.create(
      {
        categoryId: new UniqueEntityID(raw.categoryId),
        businessPointId: new UniqueEntityID(raw.businessPointId),
        name: raw.name,
        location: location || null,
        status,
        openingHours,
        censorship: raw.censorship,
        description: raw.description,
        website: raw.website,
        highlight: raw.highlight,
        neighborhood: raw.neighborhood,
        street: raw.street,
        houseNumber: raw.houseNumber,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(
    businessPointDraft: BusinessPointDraft,
  ): BusinessPointDraftSelectType {
    return {
      id: businessPointDraft.id.toString(),
      categoryId: businessPointDraft.categoryId.toString(),
      businessPointId: businessPointDraft.businessPointId.toString(),
      name: businessPointDraft.name,
      location:
        businessPointDraft.location &&
        Array.isArray(businessPointDraft.location.coordinates) &&
        businessPointDraft.location.coordinates.length === 2
          ? {
              x: businessPointDraft.location.coordinates[0],
              y: businessPointDraft.location.coordinates[1],
            }
          : null,
      status: businessPointDraft.status,
      openingHours: businessPointDraft.openingHours,
      censorship: businessPointDraft.censorship,
      description: businessPointDraft.description,
      website: businessPointDraft.website,
      highlight: businessPointDraft.highlight,
      neighborhood: businessPointDraft.neighborhood,
      street: businessPointDraft.street,
      houseNumber: businessPointDraft.houseNumber,
    };
  }
}
