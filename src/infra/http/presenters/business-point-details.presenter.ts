import { BusinessPointProps } from 'src/domain/our-city/enterprise/entities/business-point';

export class BusinessPointDetailsPresenter {
  static toHTTP(businessPoint: BusinessPointProps) {
    return {
      categoryId: businessPoint.categoryId.toString(),
      ownerId: businessPoint.ownerId.toString(),
      name: businessPoint.name,
      location: {
        x: businessPoint.location.coordinates[0].toString(),
        y: businessPoint.location.coordinates[1].toString(),
      },
      status: businessPoint.status,
      openingHours: businessPoint.openingHours,
      censorship: businessPoint.censorship,
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
