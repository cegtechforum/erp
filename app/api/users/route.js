import { users } from "@/app/_db/schema";
import { db } from "@/app/_lib/db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, domain } = await req.json();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isSuperUser = domain === "techops" || domain === "logistics";
    const res = await db
      .insert(users)
      .values({ email, password: hashedPassword, domain, isSuperUser });
    if (res.rowCount === 0) {
      return NextResponse.json({
        status: 500,
        error: "Insertion failed",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "User added successfully",
    });
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
    const { email, password: newPassword } = await req.json();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const res = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email));
    if (res.rowCount === 0) {
      return NextResponse.json({
        status: 404,
        error: "User not found",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { email } = await req.json();
    const res = await db.delete(users).where(eq(email, users.email));
    if (res.rowCount === 0) {
      return NextResponse.json({
        status: 404,
        error: "User not found",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}
