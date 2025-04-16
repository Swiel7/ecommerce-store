ALTER TABLE "products" ADD COLUMN "rating" numeric(3, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "numReviews" integer DEFAULT 0 NOT NULL;