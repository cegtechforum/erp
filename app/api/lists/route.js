import { db } from "@/app/_lib/db";
import { lists } from "../../_db/schema";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const result = await db.select().from(lists).where(lists.eventId.eq(id));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { messgae: "internal server error" },
      { status: 500 },
    );
  }
}
