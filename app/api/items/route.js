import { NextResponse } from "next/server";
import { db } from "@/app/_lib/db";
import { items } from "@/app/_db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const res = await db.select().from(items);
    return NextResponse.json({ res, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal server error",
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    await db.insert(items).values(data);
    return NextResponse.json({
      message: "Item inserted successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error.detail);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const { name, count } = await req.json();
    await db.update(items).set({ count }).where(eq(items.name, name));
    return NextResponse.json({
      message: "Item Count Updated successfully",
      status: 201,
    });
  } catch (error) {
    console.error(error.detail);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { name } = await req.json();
    await db.delete(items).where(eq(items.name, name));
    return NextResponse.json({
      message: "Item deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}
