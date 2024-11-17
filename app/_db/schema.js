import {
  serial,
  boolean,
  text,
  integer,
  pgTable,
  pgEnum,
  date,
  time,
  primaryKey,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "pending",
  "accepted",
  "rejected",
  "returned",
]);

export const users = pgTable("users", {
  email: text().primaryKey(),
  password: text().notNull(),
  domain: text().notNull(),
  isSuperUser: boolean("super_user").notNull().default(false),
});

export const events = pgTable("events", {
  eventId: serial("event_id").primaryKey(),
  eventName: text("event_name").notNull(),
  description: text(),
  comment: text(),
  rollNo: text("roll_no").notNull(),
  contact: text().notNull(),
  organizerName: text("organizer_name"),
  domain: text().notNull(),
  status: statusEnum().default("pending"),
  date: date("event_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});

export const lists = pgTable(
  "lists",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.eventId),
    itemName: text("item_name").notNull(),
    count: integer().notNull().default(1),
    category: text().notNull(),
    approvedCount: integer("approved_count"),
  },
  (table) => ({
    pk: primaryKey(table.eventId, table.itemName),
  }),
);

export const items = pgTable("items", {
  name: text().notNull().primaryKey(),
  count: integer().notNull().default(1),
});
