ALTER TABLE "business_point_custom_tags" DROP CONSTRAINT "business_point_custom_tags_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_custom_tags" ADD CONSTRAINT "business_point_custom_tags_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;