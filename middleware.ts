import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ✅ Public routes (no auth required)
 */
const PUBLIC_ROUTES = [
  "/",
  "/auth/sign-in",
  "/auth/verify-otp",
];

/**
 * ✅ Redirect helper
 */
const redirectToLogin = (request: NextRequest) => {
  const loginUrl = new URL("/auth/sign-in", request.url);

  // 👉 optional: redirect back after login
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete("token");

  return response;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Middleware hit:", pathname);

  /**
   * ✅ Allow public routes
   */
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  /**
   * ✅ Get token from cookies
   */
  const token = request.cookies.get("token")?.value;

  console.log("TOKEN:", token);

  /**
   * ❌ If no token → redirect
   */
  if (!token) {
    console.log("No token → redirecting");
    return redirectToLogin(request);
  }

  /**
   * ✅ Token exists → allow request
   * (JWT verify backend me hoga, middleware me nahi)
   */
  return NextResponse.next();
}

/**
 * ✅ Protected routes (slug automatically handled)
 */
export const config = {
  matcher: [
    "/profile/:path*",
    "/expert-help/:path*",
    "/agent/:path*",     // 🔥 covers /agent/slug-id
    "/bookmarks/:path*",
  ],
};