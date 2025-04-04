ALTER TABLE "products" ALTER COLUMN "regular_price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "discount_price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "title";