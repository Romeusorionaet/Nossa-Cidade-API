import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ProductImageInsertType } from '../schemas';
import { ProductImage } from 'src/domain/our-city/enterprise/entities/product-image';

export class DrizzleProductImageMapper {
  static toDomain(raw: ProductImageInsertType): ProductImage {
    return ProductImage.create(
      {
        productId: new UniqueEntityID(raw.productId),
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(productImage: ProductImage): ProductImageInsertType {
    return {
      id: productImage.id.toString(),
      productId: productImage.productId.toString(),
      url: productImage.url,
    };
  }
}
