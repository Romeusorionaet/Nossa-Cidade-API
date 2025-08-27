import { ProductWithImagesType } from 'src/core/@types/product-with-images-type';

export class ProductPresenter {
  static toHTTP(product: ProductWithImagesType) {
    return {
      id: product.id,
      businessPointId: product.businessPointId,
      title: product.title,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      imageUrls: product.imageUrls,
    };
  }
}
