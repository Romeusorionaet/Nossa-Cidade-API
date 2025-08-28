import { BusinessPointDraftType } from 'src/core/@types/business-point-draft-type';

export class BusinessPointDraftPresenter {
  static toHTTP(businessPointDraft: BusinessPointDraftType) {
    return {
      id: businessPointDraft.id.toString(),
      categoryId: businessPointDraft.categoryId.toString(),
      name: businessPointDraft.name,
      openingHours: businessPointDraft.openingHours,
      neighborhood: businessPointDraft.neighborhood,
      street: businessPointDraft.street,
      status: businessPointDraft.status,
      houseNumber: businessPointDraft.houseNumber,
      location: {
        latitude: businessPointDraft.location.coordinates[0],
        longitude: businessPointDraft.location.coordinates[1],
      },
    };
  }
}
