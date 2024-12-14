import {
  pgTable,
  pgEnum,
  serial,
  text,
  boolean,
  timestamp,
  integer,
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
  email: text("email").primaryKey(),
  password: text("password").notNull(),
  domain: text("domain").notNull(),
  isSuperUser: boolean("super_user").notNull().default(false),
});

export const megaevents = pgTable("megaevents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const events = pgTable("events", {
  eventId: serial("event_id").primaryKey(),
  eventName: text("event_name").notNull(),
  description: text("description"),
  comment: text("comment"),
  rollNo: text("roll_no").notNull(),
  contact: text("contact").notNull(),
  organizerName: text("organizer_name"),
  megaeventId: integer("mega_event_id").references(() => megaevents.id),
  domain: text("domain").notNull(),
  acceptedTime: timestamp("accepted_time"),
  returnedTime: timestamp("returned_time"),
  status: statusEnum("status").default("pending"),
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
    count: integer("count").notNull().default(1),
    description: text("description").notNull(),
    approvedCount: integer("approved_count"),
  },
  (table) => ({
    primaryKey: primaryKey({ columns: [table.eventId, table.itemName] }),
  }),
);

export const items = pgTable("items", {
  name: text("name").notNull().primaryKey(),
  count: integer("count").notNull().default(1),
});
