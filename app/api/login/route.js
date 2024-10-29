import { db } from "@/app/_lib/db";
import { users } from "@/app/_db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email.trim() || !password.trim()) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((rows) => rows[0]);

    if (user && user.password === password) {
      const { password: pass, ...userDetails } = user;
      return NextResponse.json(
        { message: "Login successful", user: userDetails },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 },
    );
  }
}
