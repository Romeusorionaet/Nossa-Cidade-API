import type { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Entity } from "src/core/entities/entity";

export interface SharedResourceProps {
	name: string;
}

export class SharedResource extends Entity<SharedResourceProps> {
	get name() {
		return this.props.name;
	}

	static create(props: SharedResourceProps, id?: UniqueEntityID) {
		return new SharedResource(
			{
				...props,
			},
			id,
		);
	}
}
