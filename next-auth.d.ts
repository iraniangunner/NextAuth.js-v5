import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@/prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  email: string;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    error?: "RefreshTokenError" 
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     access_token: string
//     expires_at: number
//     refresh_token?: string
//     error?: "RefreshTokenError"
//   }
// }
