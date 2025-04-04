ALTER TABLE "business_points" ADD COLUMN "neighborhood" varchar(50);--> statement-breakpoint
ALTER TABLE "business_points" ADD COLUMN "street" varchar(50);--> statement-breakpoint
ALTER TABLE "business_points" ADD COLUMN "house_number" integer;--> statement-breakpoint
ALTER TABLE "business_point_drafts" ADD COLUMN "neighborhood" varchar(50);--> statement-breakpoint
ALTER TABLE "business_point_drafts" ADD COLUMN "street" varchar(50);--> statement-breakpoint
ALTER TABLE "business_point_drafts" ADD COLUMN "house_number" integer;--> statement-breakpoint
ALTER TABLE "business_point_drafts" DROP COLUMN "address";