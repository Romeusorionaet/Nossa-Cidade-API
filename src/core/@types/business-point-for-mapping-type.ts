import { UniqueEntityID } from '../entities/unique-entity-id';

export type BusinessPointForMappingType = {
  id: UniqueEntityID;
  categoryId: UniqueEntityID;
  name: string;
  openingHours: Record<string, any>;
  location: {
    latitude: number;
    longitude: number;
  };
};
