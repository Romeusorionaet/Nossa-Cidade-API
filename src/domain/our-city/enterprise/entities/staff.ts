import type { UniqueEntityID } from "src/core/entities/unique-entity-id";
import type { StaffStatus } from "./enums/staff-status";
import { Entity } from "src/core/entities/entity";
import type { UsersRole } from "./enums/users-role";

export interface StaffProps {
	userId: UniqueEntityID;
	role: UsersRole;
	status: StaffStatus;
}

export class Staff extends Entity<StaffProps> {
	get userId() {
		return this.props.userId;
	}

	get role() {
		return this.props.role;
	}

	get status() {
		return this.props.status;
	}

	static create(props: StaffProps, id?: UniqueEntityID) {
		return new Staff(
			{
				...props,
			},
			id,
		);
	}
}
