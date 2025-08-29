ALTER TABLE "products" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "business_points" ALTER COLUMN "name" SET DATA TYPE varchar(45);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "business_point_name" text;