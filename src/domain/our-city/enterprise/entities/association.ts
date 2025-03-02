import type { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Entity } from "src/core/entities/entity";

export interface AssociationProps {
	businessPointId: UniqueEntityID;
	relatedEntityId: UniqueEntityID;
}

export class Association extends Entity<AssociationProps> {
	get businessPointId() {
		return this.props.businessPointId;
	}

	get relatedEntityId() {
		return this.props.relatedEntityId;
	}

	static create(props: AssociationProps, id?: UniqueEntityID) {
		return new Association(
			{
				...props,
			},
			id,
		);
	}
}
