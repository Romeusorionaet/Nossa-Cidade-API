import type { User } from "src/domain/our-city/enterprise/entities/user";

export class UserProfilePresenter {
	static toHTTP(userProfile: User) {
		return {
			publicId: userProfile.publicId.toString(),
			username: userProfile.username,
			email: userProfile.email,
			avatar: userProfile.avatar,
			emailVerified: userProfile.emailVerified,
			createdAt: userProfile.createdAt,
			updatedAt: userProfile.updatedAt,
		};
	}
}
