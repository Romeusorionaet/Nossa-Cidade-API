import { Product } from 'src/domain/our-city/enterprise/entities/product';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ProductsInsertType } from '../schemas';

export class DrizzleProductMapper {
  static toDomain(raw: ProductsInsertType): Product {
    return Product.create(
      {
        businessPointId: new UniqueEntityID(raw.businessPointId),
        price: raw.price,
        title: raw.title,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDrizzle(product: Product): ProductsInsertType {
    return {
      id: product.id.toString(),
      businessPointId: product.businessPointId.toString(),
      price: product.price,
      title: product.title,
      updatedAt: product.updatedAt,
      createdAt: product.createdAt,
    };
  }
}
