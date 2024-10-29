ALTER TABLE "lists" RENAME COLUMN "product" TO "item_name";--> statement-breakpoint
ALTER TABLE "items" ADD PRIMARY KEY ("name");--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "count" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "lists" ALTER COLUMN "count" SET DEFAULT 1;