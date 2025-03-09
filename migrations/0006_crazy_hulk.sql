ALTER TABLE "business_point_custom_tags_association" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "business_point_custom_tags_association" CASCADE;--> statement-breakpoint
ALTER TABLE "business_point_custom_tags" ADD COLUMN "business_point_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "business_point_custom_tags" ADD CONSTRAINT "business_point_custom_tags_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE no action ON UPDATE no action;