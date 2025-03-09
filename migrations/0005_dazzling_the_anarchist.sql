CREATE TABLE "business_point_custom_tags_association" (
	"business_point_id" text NOT NULL,
	"business_point_custom_tags_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "business_point_custom_tags" DROP CONSTRAINT "business_point_custom_tags_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_custom_tags_association" ADD CONSTRAINT "business_point_custom_tags_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_custom_tags_association" ADD CONSTRAINT "business_point_custom_tags_association_business_point_custom_tags_id_business_point_custom_tags_id_fk" FOREIGN KEY ("business_point_custom_tags_id") REFERENCES "public"."business_point_custom_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_custom_tags" DROP COLUMN "business_point_id";