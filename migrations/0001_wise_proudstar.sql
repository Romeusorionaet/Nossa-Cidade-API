CREATE TYPE "public"."business_point_draft_status" AS ENUM('PENDENT', 'APPROVED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."business_point_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."staff_status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TYPE "public"."users_role" AS ENUM('MERCHANT', 'ADMIN');--> statement-breakpoint
CREATE TABLE "business_point_to_accessibility_association" (
	"business_point_id" text NOT NULL,
	"accessibility_id" text NOT NULL,
	CONSTRAINT "business_point_to_accessibility_association_pk" PRIMARY KEY("business_point_id","accessibility_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_amenities_association" (
	"business_point_id" text NOT NULL,
	"amenities_id" text NOT NULL,
	CONSTRAINT "business_point_to_amenities_association_pk" PRIMARY KEY("business_point_id","amenities_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_audience_association" (
	"business_point_id" text NOT NULL,
	"audience_id" text NOT NULL,
	CONSTRAINT "business_point_to_audience_association_pk" PRIMARY KEY("business_point_id","audience_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_categories_association" (
	"business_point_id" text NOT NULL,
	"business_point_category_id" text NOT NULL,
	CONSTRAINT "business_point_categories_association_pk" PRIMARY KEY("business_point_id","business_point_category_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_environment_association" (
	"business_point_id" text NOT NULL,
	"environment_id" text NOT NULL,
	CONSTRAINT "business_point_to_environment_association_pk" PRIMARY KEY("business_point_id","environment_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_menu_association" (
	"business_point_id" text NOT NULL,
	"menu_id" text NOT NULL,
	CONSTRAINT "business_point_to_menu_association_pk" PRIMARY KEY("business_point_id","menu_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_parking_association" (
	"business_point_id" text NOT NULL,
	"parking_id" text NOT NULL,
	CONSTRAINT "business_point_to_parking_association_pk" PRIMARY KEY("business_point_id","parking_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_payment_association" (
	"business_point_id" text NOT NULL,
	"payments_id" text NOT NULL,
	CONSTRAINT "business_point_to_payment_association_pk" PRIMARY KEY("business_point_id","payments_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_pets_association" (
	"business_point_id" text NOT NULL,
	"pets_id" text NOT NULL,
	CONSTRAINT "business_point_to_pets_association_pk" PRIMARY KEY("business_point_id","pets_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_planning_association" (
	"business_point_id" text NOT NULL,
	"planning_id" text NOT NULL,
	CONSTRAINT "business_point_to_planning_association_pk" PRIMARY KEY("business_point_id","planning_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_to_service_option_association" (
	"business_point_id" text NOT NULL,
	"service_option_id" text NOT NULL,
	CONSTRAINT "business_point_to_service_option_association_pk" PRIMARY KEY("business_point_id","service_option_id")
);
--> statement-breakpoint
CREATE TABLE "business_point_custom_tags" (
	"id" text PRIMARY KEY NOT NULL,
	"business_point_id" text NOT NULL,
	"tag" varchar(25) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_point_favorites" (
	"user_id" text NOT NULL,
	"business_point_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_point_images" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"business_point_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_points" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category_id" text NOT NULL,
	"description" varchar(500),
	"address" varchar(200),
	"location" geometry(point) NOT NULL,
	"status" "business_point_status" DEFAULT 'ACTIVE',
	"opening_hours" jsonb NOT NULL,
	"website" varchar(500),
	"awaiting_approval" boolean DEFAULT true,
	"censorship" boolean DEFAULT false,
	"highlight" varchar(100),
	"owner_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "business_points_location_unique" UNIQUE("location")
);
--> statement-breakpoint
CREATE TABLE "staff" (
	"id" text PRIMARY KEY NOT NULL,
	"role" "users_role" NOT NULL,
	"status" "staff_status" DEFAULT 'ACTIVE',
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"public_id" text,
	"username" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"avatar" varchar(500),
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "accessibility" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "accessibility_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "amenities" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "amenities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "audience" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "audience_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "business_point_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	CONSTRAINT "business_point_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "category_tags" (
	"id" text PRIMARY KEY NOT NULL,
	"business_point_category_id" text NOT NULL,
	"tag" varchar(25) NOT NULL,
	CONSTRAINT "category_tags_business_point_category_id_tag_unique" UNIQUE("business_point_category_id","tag")
);
--> statement-breakpoint
CREATE TABLE "environment" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "environment_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "menu" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "menu_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "parking" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "parking_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "payments_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "pets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "pets_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "planning" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "planning_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "service_options" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "service_options_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "business_point_drafts" (
	"id" text PRIMARY KEY NOT NULL,
	"business_point_id" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"category_id" text NOT NULL,
	"description" varchar(500),
	"address" varchar(200),
	"location" geometry(point) NOT NULL,
	"status" "business_point_draft_status" DEFAULT 'PENDENT',
	"opening_hours" jsonb NOT NULL,
	"website" varchar(500),
	"censorship" boolean DEFAULT false,
	"highlight" varchar(100),
	CONSTRAINT "business_point_drafts_location_unique" UNIQUE("location")
);
--> statement-breakpoint
ALTER TABLE "business_point_to_accessibility_association" ADD CONSTRAINT "business_point_to_accessibility_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_accessibility_association" ADD CONSTRAINT "business_point_to_accessibility_association_accessibility_id_accessibility_id_fk" FOREIGN KEY ("accessibility_id") REFERENCES "public"."accessibility"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_amenities_association" ADD CONSTRAINT "business_point_to_amenities_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_amenities_association" ADD CONSTRAINT "business_point_to_amenities_association_amenities_id_amenities_id_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_audience_association" ADD CONSTRAINT "business_point_to_audience_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_audience_association" ADD CONSTRAINT "business_point_to_audience_association_audience_id_audience_id_fk" FOREIGN KEY ("audience_id") REFERENCES "public"."audience"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_categories_association" ADD CONSTRAINT "business_point_to_categories_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_categories_association" ADD CONSTRAINT "business_point_to_categories_association_business_point_category_id_business_point_categories_id_fk" FOREIGN KEY ("business_point_category_id") REFERENCES "public"."business_point_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_environment_association" ADD CONSTRAINT "business_point_to_environment_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_environment_association" ADD CONSTRAINT "business_point_to_environment_association_environment_id_environment_id_fk" FOREIGN KEY ("environment_id") REFERENCES "public"."environment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_menu_association" ADD CONSTRAINT "business_point_to_menu_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_menu_association" ADD CONSTRAINT "business_point_to_menu_association_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_parking_association" ADD CONSTRAINT "business_point_to_parking_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_parking_association" ADD CONSTRAINT "business_point_to_parking_association_parking_id_parking_id_fk" FOREIGN KEY ("parking_id") REFERENCES "public"."parking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_payment_association" ADD CONSTRAINT "business_point_to_payment_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_payment_association" ADD CONSTRAINT "business_point_to_payment_association_payments_id_payments_id_fk" FOREIGN KEY ("payments_id") REFERENCES "public"."payments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_pets_association" ADD CONSTRAINT "business_point_to_pets_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_pets_association" ADD CONSTRAINT "business_point_to_pets_association_pets_id_pets_id_fk" FOREIGN KEY ("pets_id") REFERENCES "public"."pets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_planning_association" ADD CONSTRAINT "business_point_to_planning_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_planning_association" ADD CONSTRAINT "business_point_to_planning_association_planning_id_planning_id_fk" FOREIGN KEY ("planning_id") REFERENCES "public"."planning"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_service_option_association" ADD CONSTRAINT "business_point_to_service_option_association_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_to_service_option_association" ADD CONSTRAINT "business_point_to_service_option_association_service_option_id_service_options_id_fk" FOREIGN KEY ("service_option_id") REFERENCES "public"."service_options"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_custom_tags" ADD CONSTRAINT "business_point_custom_tags_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_favorites" ADD CONSTRAINT "business_point_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_favorites" ADD CONSTRAINT "business_point_favorites_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_images" ADD CONSTRAINT "business_point_images_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_points" ADD CONSTRAINT "business_points_category_id_business_point_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."business_point_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_points" ADD CONSTRAINT "business_points_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_tags" ADD CONSTRAINT "category_tags_business_point_category_id_business_point_categories_id_fk" FOREIGN KEY ("business_point_category_id") REFERENCES "public"."business_point_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_drafts" ADD CONSTRAINT "business_point_drafts_business_point_id_business_points_id_fk" FOREIGN KEY ("business_point_id") REFERENCES "public"."business_points"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_point_drafts" ADD CONSTRAINT "business_point_drafts_category_id_business_point_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."business_point_categories"("id") ON DELETE no action ON UPDATE no action;