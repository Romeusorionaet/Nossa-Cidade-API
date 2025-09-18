export class ProductPresenter {
  static toHTTP(product: ProductWithImagesType) {
    return {
      id: product.id,
      businessPointId: product.businessPointId,
      businessPointName: product.businessPointName,
      title: product.title,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      imageUrls: product.imageUrls,
    };
  }
}
