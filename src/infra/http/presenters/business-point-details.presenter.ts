import type { BusinessPointProps } from "src/domain/our-city/enterprise/entities/business-point";

export class BusinessPointDetailsPresenter {
	static toHTTP(businessPoint: BusinessPointProps) {
		return {
			categoryId: businessPoint.categoryId.toString(),
			ownerId: businessPoint.ownerId.toString(),
			name: businessPoint.name,
			location: {
				x: businessPoint.location.coordinates[0],
				y: businessPoint.location.coordinates[1],
			},
			status: businessPoint.status,
			openingHours: businessPoint.openingHours,
			censorship: businessPoint.censorship,
			awaitingApproval: businessPoint.awaitingApproval,
			description: businessPoint.description,
			images: businessPoint.images,
			website: businessPoint.website,
			tags: businessPoint.tags,
			highlight: businessPoint.highlight,
			updatedAt: businessPoint.updatedAt,
			createdAt: businessPoint.createdAt,
		};
	}
}
