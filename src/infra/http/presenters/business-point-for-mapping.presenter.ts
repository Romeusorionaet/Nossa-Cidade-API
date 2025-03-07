import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';

export class BusinessPointForMappingPresenter {
  static toHTTP(businessPoint: BusinessPointForMappingType) {
    return {
      id: businessPoint.id.toString(),
      categoryId: businessPoint.categoryId.toString(),
      name: businessPoint.name,
      address: businessPoint.address,
      openingHours: businessPoint.openingHours,
      location: {
        latitude: businessPoint.location.latitude,
        longitude: businessPoint.location.longitude,
      },
    };
  }
}
