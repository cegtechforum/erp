CREATE TYPE "public"."status" AS ENUM('pending', 'accepted', 'returned');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"event_id" serial PRIMARY KEY NOT NULL,
	"event_name" text NOT NULL,
	"description" text,
	"roll_no" text NOT NULL,
	"contact" text NOT NULL,
	"organizer_name" text,
	"domain" text NOT NULL,
	"status" "status" DEFAULT 'pending',
	"event_date" date NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lists" (
	"event_id" integer NOT NULL,
	"product" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"category" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"name" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"email" text PRIMARY KEY NOT NULL,
	"password" text NOT NULL,
	"domain" text NOT NULL,
	"super_user" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lists" ADD CONSTRAINT "lists_event_id_events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("event_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
