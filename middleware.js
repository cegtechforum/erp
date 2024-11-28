import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value || "";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const path = req.nextUrl.pathname;

  if (!token && path === "/login") {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (secret) {
    try {
      const { payload } = await jwtVerify(token, secret);
      const isSuperUser = payload.isSuperUser;

      if (!isSuperUser && (path === "/events" || path === "/items")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard", "/items", "/events/:path*"],
};
