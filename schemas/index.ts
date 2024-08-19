import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 charachters required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string({ message: "Password is required" }),
  callbackUrl: z.optional(z.string()),
});

export const TwoFactorSchema = z.object({
  code: z.string({ message: "Code is required" }),
  callbackUrl: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, { message: "Minimum 6 charachters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        // callbackUrl?: string[];
      };
      message?: string;
    }
  | undefined;

export type TwoFactorFormState =
  | {
      errors?: {
        code?: string[];
        // callbackUrl?: string[];
      };
      message?: string;
    }
  | undefined;

export type SettingsFormState =
  | {
      errors?: {
        name?: string[];
        isTwoFactorEnabled?: string[];
        role?: string[];
        email?: string[];
        password?: string[];
        newPassword?: string[];
      };
      message?: string;
    }
  | undefined;
