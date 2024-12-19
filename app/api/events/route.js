import { events, lists } from "../../_db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/app/_lib/db";

export async function POST(req) {
  try {
    const data = await req.json();
    const res = await db.insert(events).values(data.events).returning();
    const eid = res[0].eventId;
    console.log(eid, " ", data.events.list);

    if (!eid)
      return NextResponse.json({
        error: "Event creation failed.",
        status: 500,
      });

    if (Array.isArray(data.events.list)) {
      for (let i = 0; i < data.events.list.length; i++) {
        db.insert(lists).values({
          eventId: eid,
          item_name: data.events.list[i].item_name,
          count: data.events.list[i].count,
          category: data.events.list[i].category,
        });
      }
    }
    // if (Array.isArray(data.events.list)) {
    //   // Insert all items into the 'lists' table
    //   const listInsertPromises = data.events.list.map((item) =>
    //     db.insert(lists).values({
    //       event_id,
    //       item_name: item.item_name,
    //       count: Number(item.count), // Ensure type consistency
    //       category: item.category,
    //     }),
    //   );

    //   // Await all insertions
    //   await Promise.all(listInsertPromises);
    // }

    return NextResponse.json({ message: "Event created", status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const { eventId, status } = await req.json();
    if (!eventId || !status)
      return NextResponse.json({
        error: "Event ID and status needed.",
        status: 400,
      });

    const res = await db
      .update(events)
      .set({ status })
      .where(eq(events.eventId, eventId));

    if (res.rowCount === 0) {
      return NextResponse.json({
        error: "Event not found",
        status: 500,
      });
    }

    return NextResponse.json({ message: "Status updated", status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal Server error",
      status: 500,
    });
  }
}
