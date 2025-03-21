CREATE TABLE "business_point_images" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"business_point_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "business_point_images" ADD CONSTRAINT "business_point_images_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;