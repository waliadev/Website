import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Public routes which do not require authentication
 */
const PUBLIC_ROUTES = [
  "/",
  "/auth/sign-in",
  "/auth/verify-otp",
];

/**
 * Routes that must be protected
 */
const PROTECTED_ROUTES = [
  // "/profile",
  // "/expert-help",
  "/agent",
  // "/bookmarks",
];

/**
 * Check if route is protected
 */
const isProtectedRoute = (pathname: string) =>
  PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

/**
 * Remove invalid cookie and redirect
 */
const redirectToLogin = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/auth/sign-in", request.url));
  response.cookies.delete("token");
  return response;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return redirectToLogin(request);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    /**
     * Optional: additional validation
     */
    if (!decoded || !decoded.userId) {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  } catch (error) {
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/expert-help/:path*",
    "/agent/:path*",
    "/bookmarks/:path*",
  ],
};