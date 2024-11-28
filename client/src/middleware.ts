import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { LOGIN, PUBLIC_ROUTES } from "@/constant/routes";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicPath = PUBLIC_ROUTES.some((path) =>
    nextUrl.pathname.startsWith(path)
  );

  if (isLoggedIn && nextUrl.pathname === LOGIN) {
    return NextResponse.redirect(new URL("/me", nextUrl));
  }

  if (!isLoggedIn && !isPublicPath) {
    const loginUrl = new URL(LOGIN, nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/me/:path*,", "/login"],
};
