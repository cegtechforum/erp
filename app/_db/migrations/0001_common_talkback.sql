ALTER TYPE "public"."status" ADD VALUE 'rejected' BEFORE 'returned';--> statement-breakpoint
ALTER TABLE "products" RENAME TO "items";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "comment" text;