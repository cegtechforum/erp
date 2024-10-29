import { events } from "../../_db/schema";
import { NextResponse } from "next/server";
import { db } from "@/app/_lib/db";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);

    const result = await db.insert(events).values(data);
    console.log(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const result = await db.select().from(events);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { messgae: "internal server error" },
      { status: 500 },
    );
  }
}


