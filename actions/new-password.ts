"use server";
import { getPasswordResetTokenByToken } from "@/data/passsword-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { FormState } from "@/schemas";
import bcrypt from "bcryptjs";

export const newPassword = async (state: FormState, formData: FormData) => {
  const validatedFields = NewPasswordSchema.safeParse({
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { password } = validatedFields.data;

  const token = formData.get("token") as string;

  if (!token) {
    return { error: "Missing token!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return {
      success: "Password Updated!",
    };
  } catch (error) {
    return {
      error: "Password does not Updated!",
    };
  }
};
