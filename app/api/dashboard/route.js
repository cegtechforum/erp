import { NextResponse } from "next/server";
import { db } from "@/app/_lib/db";
import { events } from "@/app/_db/schema";
import { jwtVerify } from "jose";

export async function GET(req) {
  const token = req.cookies.get("token")?.value || "";
  if (!token) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const userDomain = payload.domain;

    const domainEvents = await db
      .select()
      .from(events)
      .where(eq(events.domain, userDomain))
      .then((rows) => rows.map((row) => row.eventName));

    return NextResponse.json({ events: domainEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events", status: 500 });
  }
}
