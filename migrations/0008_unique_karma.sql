CREATE TABLE "business_point_to_environment_association" (
	"business_point_id" text NOT NULL,
	"environment_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "environment" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "environment_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "business_point_to_environment_association" ADD CONSTRAINT "business_point_to_environment_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_environment_association" ADD CONSTRAINT "business_point_to_environment_association_environment_id_environment_id_fk" FOREIGN KEY ("environment_id") REFERENCES "public"."environment"("id") ON DELETE no action ON UPDATE no action;