import { BusinessPointImage } from 'src/domain/our-city/enterprise/entities/business-point-image';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { BusinessPointImageInsertType } from '../schemas';

export class DrizzleBusinessPointImageMapper {
  static toDomain(raw: BusinessPointImageInsertType): BusinessPointImage {
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
  ): BusinessPointImageInsertType {
    return {
      id: businessPointImage.id.toString(),
      businessPointId: businessPointImage.businessPointId.toString(),
      url: businessPointImage.url,
    };
  }
}
