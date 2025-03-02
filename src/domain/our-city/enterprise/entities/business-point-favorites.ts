import type { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Entity } from "src/core/entities/entity";

export interface businessPointFavoritesProps {
	userId: UniqueEntityID;
	businessPointId: UniqueEntityID;
}

export class businessPointFavorites extends Entity<businessPointFavoritesProps> {
	get userId() {
		return this.props.userId;
	}

	get businessPointId() {
		return this.props.businessPointId;
	}

	static create(props: businessPointFavoritesProps, id?: UniqueEntityID) {
		return new businessPointFavorites(
			{
				...props,
			},
			id,
		);
	}
}
