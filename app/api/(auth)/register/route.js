import { db } from "@/app/_lib/db";
import { users } from "@/app/_db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const domains = [
  "creativity & initiatives",
  "contents",
  "design",
  "events",
  "finance",
  "guest lectures",
  "hospitality",
  "human resources",
  "industry relations",
  "internal auditing",
  "logistics",
  "marketing & media",
  "projects & research",
  "quality assurance & control",
  "techops",
  "workshops",
  "xceed & karnival",
];

const superUserDomains = ["logistics", "techops"];

export async function POST(req) {
  try {
    const { email, password, domain } = await req.json();

    if (!email.trim() || !password.trim() || !domain.trim()) {
      return NextResponse.json({
        error: "Email, password and domain are required",
        status: 400,
      });
    }

    if (!domains.includes(domain.toLowerCase())) {
      return NextResponse.json({
        error: "Invalid domain",
        status: 400,
      });
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((rows) => rows[0]);

    if (existingUser) {
      return NextResponse.json({
        error: "Email already exists",
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isSuperUser = superUserDomains.includes(domain.toLowerCase());

    const newUser = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        domain,
        isSuperUser,
      })
      .returning();

    return NextResponse.json({
      message: "Registration successful",
      status: 201,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      error: error.detail || "Internal Server Error",
      status: 500,
    });
  }
}
