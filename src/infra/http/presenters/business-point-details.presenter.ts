import { BusinessPointProps } from 'src/domain/our-city/enterprise/entities/business-point';

export class BusinessPointDetailsPresenter {
  static toHTTP(businessPoint: BusinessPointProps) {
    return {
      categoryId: businessPoint.categoryId.toString(),
      ownerId: businessPoint.ownerId.toString(),
      name: businessPoint.name,
      address: businessPoint.address,
      location: {
        x: businessPoint.location.coordinates[0],
        y: businessPoint.location.coordinates[1],
      },
      status: businessPoint.status,
      openingHours: businessPoint.openingHours,
      censorship: businessPoint.censorship,
      description: businessPoint.description,
      website: businessPoint.website,
      highlight: businessPoint.highlight,
      updatedAt: businessPoint.updatedAt,
      createdAt: businessPoint.createdAt,
    };
  }
}
