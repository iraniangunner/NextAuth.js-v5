"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema, FormState } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const signup = async (state: FormState, formData: FormData) => {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { message: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //TODO : Send verification token email

  return { message: "User created!" };
};
