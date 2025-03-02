import type { StaffStatus } from "src/domain/our-city/enterprise/entities/enums/staff-status";
import type { UsersRole } from "src/domain/our-city/enterprise/entities/enums/users-role";
import { Staff } from "src/domain/our-city/enterprise/entities/staff";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import type { StaffInsertType } from "../schemas";

export class DrizzleStaffMapper {
	static toDomain(raw: StaffInsertType): Staff {
		const status: StaffStatus = raw.status as StaffStatus;
		const role: UsersRole = raw.role as UsersRole;

		return Staff.create(
			{
				userId: new UniqueEntityID(raw.userId),
				status,
				role,
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toDrizzle(staff: Staff): StaffInsertType {
		return {
			id: staff.id.toString(),
			userId: staff.userId.toString(),
			status: staff.status,
			role: staff.role,
		};
	}
}
