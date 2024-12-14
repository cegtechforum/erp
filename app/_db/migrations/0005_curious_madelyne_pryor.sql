CREATE TABLE IF NOT EXISTS "megaevents" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lists" RENAME COLUMN "category" TO "description";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "mega_event_id" integer;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "accepted_time" timestamp;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "returned_time" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_mega_event_id_megaevents_id_fk" FOREIGN KEY ("mega_event_id") REFERENCES "public"."megaevents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
