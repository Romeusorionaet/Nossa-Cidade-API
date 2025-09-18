import { DraftStatus } from 'src/domain/our-city/enterprise/entities/enums/draft-status';
import { UniqueEntityID } from '../entities/unique-entity-id';

export type BusinessPointDraftType = {
  id: UniqueEntityID;
  categoryId: UniqueEntityID;
  businessPointId: UniqueEntityID;
  name: string;
  location: GeometryPoint;
  openingHours: Record<string, any>;
  censorship: boolean;
  description: string;
  website: string;
  highlight: string;
  status: DraftStatus;
  neighborhood: string;
  street: string;
  houseNumber: number;
};
