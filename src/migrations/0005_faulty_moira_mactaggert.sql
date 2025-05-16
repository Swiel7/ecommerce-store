ALTER TABLE "orders" ALTER COLUMN "shipping_address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "payment_method" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "is_paid" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "payment_id";