CREATE TYPE "public"."billing-cycle" AS ENUM('MONTHLY', 'ANNUAL');--> statement-breakpoint
CREATE TYPE "public"."plans-name" AS ENUM('FREE', 'PROFESSIONAL', 'PREMIUM');--> statement-breakpoint
CREATE TYPE "public"."status-plan" AS ENUM('ACTIVE', 'CANCELLED', 'EXPIRED');--> statement-breakpoint
CREATE TABLE "plans" (
	"id" text PRIMARY KEY NOT NULL,
	"plans-name" "plans-name" NOT NULL,
	"price" integer NOT NULL,
	"billing-cycle" "billing-cycle",
	"features" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "user_plans" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan_id" text NOT NULL,
	"status" "status-plan" NOT NULL,
	"price_at_purchase" integer NOT NULL,
	"start_date" timestamp with time zone DEFAULT now() NOT NULL,
	"end_date" timestamp with time zone,
	"payment_reference" text
);
--> statement-breakpoint
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;