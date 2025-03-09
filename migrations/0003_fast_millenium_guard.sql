CREATE TABLE "business_point_custom_tags" (
	"id" text PRIMARY KEY NOT NULL,
	"business_point_id" text NOT NULL,
	"tag" varchar(25) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "business_point_custom_tags" ADD CONSTRAINT "business_point_custom_tags_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public"."staff" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."users_role";--> statement-breakpoint
CREATE TYPE "public"."users_role" AS ENUM('MERCHANT', 'ADMIN');--> statement-breakpoint
ALTER TABLE "public"."staff" ALTER COLUMN "role" SET DATA TYPE "public"."users_role" USING "role"::"public"."users_role";