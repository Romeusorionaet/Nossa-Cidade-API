ALTER TABLE "category_tags" DROP CONSTRAINT "category_tags_business_point_category_id_business_point_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_drafts" DROP CONSTRAINT "business_point_drafts_category_id_business_point_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "category_tags" ADD CONSTRAINT "category_tags_business_point_category_id_business_point_categories_id_fk" FOREIGN KEY ("business_point_category_id") REFERENCES "public"."business_point_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_drafts" ADD CONSTRAINT "business_point_drafts_category_id_business_point_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."business_point_categories"("id") ON DELETE cascade ON UPDATE no action;