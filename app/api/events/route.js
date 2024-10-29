import { events } from "../../_db/schema";
import { NextResponse } from "next/server";
import { db } from "@/app/_lib/db";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);

    const res = await db.insert(events).values(data);
    console.log(res);

    return NextResponse.json({
      message: "Event added successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const res = await db.select().from(events);
    return NextResponse.json({ res, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal server error",
      status: 500,
    });
  }
}
