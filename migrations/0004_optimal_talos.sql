ALTER TABLE "business_point_categories_association" DROP CONSTRAINT "business_point_categories_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_accessibility_association" DROP CONSTRAINT "business_point_to_accessibility_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_amenities_association" DROP CONSTRAINT "business_point_to_amenities_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_audience_association" DROP CONSTRAINT "business_point_to_audience_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_menu_association" DROP CONSTRAINT "business_point_to_menu_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_parking_association" DROP CONSTRAINT "business_point_to_parking_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_payment_association" DROP CONSTRAINT "business_point_to_payment_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_pets_association" DROP CONSTRAINT "business_point_to_pets_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_planning_association" DROP CONSTRAINT "business_point_to_planning_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_to_service_option_association" DROP CONSTRAINT "business_point_to_service_option_association_business_point_id_business_points_id_fk";
--> statement-breakpoint
ALTER TABLE "business_point_categories_association" ADD CONSTRAINT "business_point_categories_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_accessibility_association" ADD CONSTRAINT "business_point_to_accessibility_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_amenities_association" ADD CONSTRAINT "business_point_to_amenities_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_audience_association" ADD CONSTRAINT "business_point_to_audience_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_menu_association" ADD CONSTRAINT "business_point_to_menu_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_parking_association" ADD CONSTRAINT "business_point_to_parking_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_payment_association" ADD CONSTRAINT "business_point_to_payment_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_pets_association" ADD CONSTRAINT "business_point_to_pets_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_planning_association" ADD CONSTRAINT "business_point_to_planning_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_service_option_association" ADD CONSTRAINT "business_point_to_service_option_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;