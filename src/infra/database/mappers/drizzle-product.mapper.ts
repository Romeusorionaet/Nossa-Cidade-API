import { Product } from 'src/domain/our-city/enterprise/entities/product';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ProductsInsertType } from '../schemas';
import { SearchableText } from 'src/domain/our-city/enterprise/value-objects/search-title';

export class DrizzleProductMapper {
  static toDomain(raw: ProductsInsertType): Product {
    return Product.create(
      {
        businessPointId: new UniqueEntityID(raw.businessPointId),
        businessPointName: raw.businessPointName,
        price: raw.price,
        title: raw.title,
        searchTitle: SearchableText.createFromText(raw.searchTitle),
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
      businessPointName: product.businessPointName,
      price: product.price,
      title: product.title,
      searchTitle: product.searchTitle.value,
      updatedAt: product.updatedAt,
      createdAt: product.createdAt,
    };
  }
}
