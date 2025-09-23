ALTER TABLE "user_plans" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';--> statement-breakpoint
ALTER TABLE "user_plans" ALTER COLUMN "end_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "public"."plans" ALTER COLUMN "plans-name" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."plans-name";--> statement-breakpoint
CREATE TYPE "public"."plans-name" AS ENUM('PROFESSIONAL', 'PREMIUM');--> statement-breakpoint
ALTER TABLE "public"."plans" ALTER COLUMN "plans-name" SET DATA TYPE "public"."plans-name" USING "plans-name"::"public"."plans-name";