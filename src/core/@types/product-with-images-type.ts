import { ProductImageType } from './product-image-type';

export type ProductWithImagesType = {
  id: string;
  businessPointId: string;
  title: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  imageUrls: ProductImageType[];
};
