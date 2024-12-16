import { events, lists } from "../../_db/schema";
import { eq,sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/app/_lib/db";
import * as XLSX from "xlsx";

export async function POST(req) {
  try {
    const data = await req.json();
    const res = await db.insert(events).values(data.events).returning();
    const eid = res[0].eventId;
    console.log(data);
    if (!eid)
      return NextResponse.json({
        error: "Event creation failed.",
        status: 500,
      });

    if (Array.isArray(data.list)) {
      for (let i = 0; i < data.list.length; i++) {
        console.log(data.list, data.list.length);
        await db.insert(lists).values({
          eventId: eid,
          itemName: data.list[i].itemName,
          count: data.list[i].count,
          approvedCount: 0,
          description: data.list[i].description,
        });
      }
    }
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

      const updateData = { status };

if (status === "accepted") {
  updateData.acceptedTime = sql`CURRENT_TIMESTAMP`; // Set acceptedTime only if status is "accepted"
}

const res = await db
  .update(events)
  .set(updateData)
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

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const eventId = url.searchParams.get("eventId");
    console.log(`Received eventId: ${eventId}`);

    // Fetch data conditionally based on eventId
    const eventsQuery = eventId
      ? db.select().from(events).where(eq(events.eventId, eventId)) // Use `eq` for condition
      : db.select().from(events); // Fetch all events

    const listsQuery = eventId
      ? db.select().from(lists).where(eq(lists.eventId, eventId)) // Use `eq` for condition
      : db.select().from(lists); // Fetch all lists

    const eventsData = await eventsQuery;
    const listsData = await listsQuery;

    // Combine event and list data
    const combinedData = eventsData
      .map((event) => {
        const eventLists = listsData.filter(
          (list) => list.eventId === event.eventId,
        );
        return eventLists.map((list) => ({
          eventId: event.eventId,
          eventName: event.eventName,
          description: event.description,
          itemName: list.itemName,
          requestedCount: list.count,
          approvedCount: list.approvedCount,
          rollNo: event.rollNo,
          contact: event.contact,
          organizerName: event.organizerName,
          domain: event.domain,
          status: event.status,
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
        }));
      })
      .flat();

    // Generate Excel sheet
    const ws = XLSX.utils.json_to_sheet(combinedData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Event List Data");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="event_list_data${eventId ? `_${eventId}` : ""}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error while generating Excel file:", error);

    return NextResponse.json(
      { error: "Failed to generate Excel file. Please try again later." },
      { status: 500 },
    );
  }
}
