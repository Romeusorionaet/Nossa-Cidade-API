import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ProductImage } from 'src/domain/our-city/enterprise/entities/product-image';
import { ProductImageSelectModelType } from '../schemas';

export class DrizzleProductImageMapper {
  static toDomain(raw: ProductImageSelectModelType): ProductImage {
    return ProductImage.create(
      {
        productId: new UniqueEntityID(raw.productId),
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(productImage: ProductImage): ProductImageSelectModelType {
    return {
      id: productImage.id.toString(),
      productId: productImage.productId.toString(),
      url: productImage.url,
    };
  }
}
