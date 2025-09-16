import { BusinessPointImage } from 'src/domain/our-city/enterprise/entities/business-point-image';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { BusinessPointImageSelectModelType } from '../schemas';

export class DrizzleBusinessPointImageMapper {
  static toDomain(raw: BusinessPointImageSelectModelType): BusinessPointImage {
    return BusinessPointImage.create(
      {
        businessPointId: new UniqueEntityID(raw.businessPointId),
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(
    businessPointImage: BusinessPointImage,
  ): BusinessPointImageSelectModelType {
    return {
      id: businessPointImage.id.toString(),
      businessPointId: businessPointImage.businessPointId.toString(),
      url: businessPointImage.url,
    };
  }
}
