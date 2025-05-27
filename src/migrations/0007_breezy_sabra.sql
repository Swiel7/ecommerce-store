ALTER TABLE "orders" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
-- ALTER TABLE "public"."orders" ALTER COLUMN "order_status" SET DATA TYPE text;--> statement-breakpoint
-- DROP TYPE "public"."order_status";--> statement-breakpoint
-- CREATE TYPE "public"."order_status" AS ENUM('Pending', 'Delivered', 'Refunded');--> statement-breakpoint
-- ALTER TABLE "public"."orders" ALTER COLUMN "order_status" SET DATA TYPE "public"."order_status" USING "order_status"::"public"."order_status";