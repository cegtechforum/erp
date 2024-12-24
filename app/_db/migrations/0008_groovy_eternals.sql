CREATE TABLE IF NOT EXISTS "items_history" (
	"name" text NOT NULL,
	"count" integer NOT NULL,
	"snapshot_date" date NOT NULL,
	CONSTRAINT "items_history_name_snapshot_date_pk" PRIMARY KEY("name","snapshot_date")
);
