// export { auth as middleware } from "@/auth";

import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
// import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  // Your custom middleware logic goes here

  const { nextUrl } = req;
  console.log(nextUrl.pathname)
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // return NextResponse.next();
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      //   const newUrl = new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl.origin);
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    // return NextResponse.next();
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // const newUrl = new URL("/auth/login", req.nextUrl.origin);
    // console.log("hello")
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  //   return NextResponse.next();

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
