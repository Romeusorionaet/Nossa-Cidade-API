import { UniqueEntityID } from '../entities/unique-entity-id';

export type BusinessPointForMappingType = {
  id: UniqueEntityID;
  name: string;
  categoryId: UniqueEntityID;
  location: {
    latitude: number;
    longitude: number;
  };
};
