import { db } from "@/app/_lib/db";
import { lists, users } from "../../_db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { sendEmail } from "./email";
import { sql } from "drizzle-orm/sql";

export async function POST(req) {
  try {
    const dt = await req.json();

    for (let i = 0; i < dt.items.length; i++) {
      const { itemName, count, eventId, approvedCount, ...rest } = dt.items[i];

      try {
        await db.insert(lists).values(dt.items[i]);
      } catch (err) {
        if (
          err.message.includes("duplicate key value violates unique constraint")
        ) {
          await db.execute(sql`
            UPDATE lists
            SET count = count + ${count}
            WHERE item_name = ${itemName} AND event_id = ${eventId};
          `);
        } else {
          throw err;
        }
      }
    }

    const superUsers = await db
      .select()
      .from(users)
      .where(eq(users.domain, "logistics"));

    await sendEmail(dt, superUsers);

    return NextResponse.json(
      {
        msg: "Requested items added/updated successfully and emails sent to super users.",
      },
      { status: 200 },
    );
  } catch (err) {
    if (err.message.includes("violates foreign key constraint")) {
      return NextResponse.json({ msg: "Event not found" }, { status: 404 });
    } else if (
      err.message.includes(
        "Invalid login: 535-5.7.8 Username and Password not accepted",
      )
    ) {
      return NextResponse.json(
        { msg: "An error in sending email to super users" },
        { status: 401 },
      );
    } else if (
      err.message.includes("Error [NeonDbError]: Error connecting to database")
    ) {
      return NextResponse.json({ msg: " Connection Error " }, { status: 404 });
    } else {
      console.error("Insert error:", err);
      return NextResponse.json({ msg: "Server error" }, { status: 500 });
    }
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const result = await db.select().from(lists).where(lists.eventId.eq(id));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
