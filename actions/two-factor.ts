"use server";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { TwoFactorSchema } from "@/schemas";
import { FormState } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const twoFactorVerificationLogin = async (
  state: FormState,
  formData: FormData
) => {
  const validatedFields = TwoFactorSchema.safeParse({
    code: formData.get("code"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { code } = validatedFields.data;

  const email = formData.get("email") as string;

  const password = formData.get("password") as string;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email) {
    return { error: "no user" };
  }
  const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

  if (!twoFactorToken) {
    return { error: "Invalid code!" };
  }

  if (twoFactorToken.token !== code) {
    return { error: "Invalid code!" };
  }

  const hasExpired = new Date(twoFactorToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Code expired!" };
  }

  await db.twoFactorToken.delete({
    where: { id: twoFactorToken.id },
  });

  const existingConfirmation = await getTwoFactorConfirmationByUserId(
    existingUser.id
  );

  if (existingConfirmation) {
    await db.twoFactorConfirmation.delete({
      where: { id: existingConfirmation.id },
    });
  }

  await db.twoFactorConfirmation.create({
    data: {
      userId: existingUser.id,
    },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };

        default:
          return { error: "Something Went Wrong!" };
      }
    }
    throw error;
  }
};
