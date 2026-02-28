// middleware.ts (in src/ folder as per your Next.js 16 setup)

import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch user/session
  let user = null;
  try {
    const sessionRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`,
      {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        cache: "no-store",
      }
    );

    if (sessionRes.ok) {
      const data = await sessionRes.json();
      user = data.user || null;
    } 
  } catch (err) {
    console.error("[MIDDLEWARE] Session fetch error:", err);
  }

  const isLoggedIn = !!user;
  const role = user?.role || null;

  // Public routes — no protection
  if (
    pathname === "/" ||
    pathname.startsWith("/medicines") ||
    pathname.startsWith("/auth") ||
    pathname === "/profile"   // ← allow profile for everyone logged in
  ) {
    if (pathname.startsWith("/auth") && isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Require login
  if (!isLoggedIn) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based protection
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/seller") && role !== "SELLER") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Customer-only protected pages (excluding profile)
  if (
    (pathname === "/my-orders" ||
      pathname.startsWith("/cart") ||
      pathname.startsWith("/checkout")) &&
    role !== "CUSTOMER"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*",
    "/profile",
    "/my-orders",
    "/cart/:path*",
    "/checkout",
    "/auth/:path*",
  ],
};