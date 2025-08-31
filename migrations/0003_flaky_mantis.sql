ALTER TABLE "business_point_categories" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "business_points" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "accessibility" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "amenities" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "audience" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "business_point_categories" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "environment" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "menu" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "parking" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "planning" ADD COLUMN "search_name" text;--> statement-breakpoint
ALTER TABLE "service_options" ADD COLUMN "search_name" text;