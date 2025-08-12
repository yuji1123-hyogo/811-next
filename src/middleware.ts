import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

function isPublicPath(pathname: string): boolean {
  const publicPaths = ["login", "/api/auth"];
  const staticPaths = ["/_next", "/favicon.ico", "/api/health"];

  return [...publicPaths, ...staticPaths].some((path) =>
    pathname.startsWith(path)
  );
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export async function middleweare(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return redirectToLogin(request);
  }

  const payload = await verifyToken(token);

  if (!payload) {
    const response = redirectToLogin(request);
    response.cookies.delete("token");
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-User-ID", payload.userId.toString());
  requestHeaders.set("X-User-Email", payload.email);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)"],
};
