import { pgEnum } from "drizzle-orm/pg-core";

export const staffStatusEnum = pgEnum("staff_status", [
	"ACTIVE",
	"INACTIVE",
	"SUSPENDED",
]);

export const businessPointStatusEnum = pgEnum("staff_status", [
	"ACTIVE",
	"INACTIVE",
]);

export const usersRoleEnum = pgEnum("users_role", [
	"MEMBER", //TODO remover member
	"MERCHANT",
	"ADMIN",
]);
export type UserRoleEnum = keyof typeof usersRoleEnum;
