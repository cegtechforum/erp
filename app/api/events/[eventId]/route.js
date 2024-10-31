import { eq } from "drizzle-orm";
import { db } from "@/app/_lib/db";
import { events } from "../../../_db/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  try {
    const res = await db
      .select()
      .from(events)
      .where(eq(events.eventId, Number(id)));
    return NextResponse.json({ res: res[0], status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}
