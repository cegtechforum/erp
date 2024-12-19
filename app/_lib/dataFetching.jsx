// app/_lib/getEventById.js
import { db } from "@/app/_lib/db";
import { events, items, lists, megaevents } from "@/app/_db/schema";
import { eq } from "drizzle-orm";

export async function getEventById(eventId) {
  try {
    const res = await db
      .select()
      .from(events)
      .where(eq(events.eventId, Number(eventId)));
    return res[0] || null;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export async function getEventsFromDb() {
  try {
    const data = await db.select().from(events);
    return data;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

export async function getItemsByEventId(eventId) {
  try {
    const data = await db
      .select()
      .from(lists)
      .where(eq(lists.eventId, Number(eventId)));
    return data;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

export async function getMegaEventsFromDb() {
  try {
    const data = await db.select().from(megaevents);
    return data;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

export async function getAllItems() {
  try {
    const data = await db.select().from(items);
    return data;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}
