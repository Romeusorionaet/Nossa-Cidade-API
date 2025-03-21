ALTER TABLE "business_point_categories_association" RENAME TO "business_point_to_categories_association";--> statement-breakpoint
ALTER TABLE "business_point_to_categories_association" DROP CONSTRAINT "business_point_categories_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_categories_association" DROP CONSTRAINT "business_point_categories_association_business_point_category_id_business_point_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_categories_association" ADD CONSTRAINT "business_point_to_categories_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_categories_association" ADD CONSTRAINT "business_point_to_categories_association_business_point_category_id_business_point_categories_id_fk" FOREIGN KEY ("business_point_category_id") REFERENCES "public"."business_point_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_points" DROP COLUMN "images";