import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  callbacks: {
    // authorized: async ({ auth, request }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   const { nextUrl } = request;

    //   const isLoggedIn = !!auth;
    //   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    //   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    //   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    //   if (isApiAuthRoute) {
    //     return NextResponse.next();
    //   }

    //   if (isAuthRoute) {
    //     if (isLoggedIn) {
    //       return Response.redirect(
    //         new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
    //       );
    //     }

    //     return NextResponse.next();
    //   }

    //   if (!isLoggedIn && !isPublicRoute) {
    //     return Response.redirect(new URL("/auth/login", nextUrl));
    //   }

    //   return NextResponse.next();
    // },
    // session:async ({session,token}) => {
    //   return session
    // }
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
