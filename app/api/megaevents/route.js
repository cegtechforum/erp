import { NextResponse } from "next/server";
import { db } from "@/app/_lib/db";
import { megaevents } from "../../_db/schema";

export async function POST(req) {
  try {
    const data = await req.json();
    await db.insert(megaevents).values(data);
    
    return NextResponse.json({ message: "MegaEvent created", status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}
