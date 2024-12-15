import { db } from "@/app/_lib/db";
import { users } from "@/app/_db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email.trim() || !password.trim()) {
      return NextResponse.json({
        error: "Email and password are required",
        status: 400,
      });
    }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((rows) => rows[0]);

    if (!user) {
      return NextResponse.json({
        error: "Email doesn't exist",
        status: 404,
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);
    if (!isValidPassword) {
      return NextResponse.json({
        error: "Wrong Password",
        status: 401,
      });
    }
    const { password: hashedPassword, ...tokenData } = user;
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      message: "Login successful",
      status: 200,
    });

    res.cookies.set("token", token, { httpOnly: true,maxAge: 60 * 60 * 24 });

    return res;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}
