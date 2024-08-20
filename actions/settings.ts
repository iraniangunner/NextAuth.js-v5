"use server";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsFormState, SettingsSchema } from "@/schemas";

export const settings = async (
  state: SettingsFormState,
  formData: FormData
) => {
  const validatedFields = SettingsSchema.safeParse({
    name: formData.get("name"),
    isTwoFactorEnabled: Boolean(formData.get("twoFactorEnabled")),
    role: formData.get("role"),
    email: formData.get("email") || undefined,
    password: formData.get("password") || undefined,
    newPassword: formData.get("newPassword") || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, isTwoFactorEnabled, role, email, password, newPassword } =
    validatedFields.data;

  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (email && email !== user.email) {
    const exisitingUser = await getUserByEmail(email);
    if (exisitingUser && exisitingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  let hashedPassword = undefined;

  if (password && newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(password, dbUser.password);

    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    hashedPassword = await bcrypt.hash(newPassword, 10);
  }

  try {
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        name,
        email,
        password: hashedPassword || password,
        role,
        isTwoFactorEnabled,
      },
    });
    return { success: "Settings Updated!" };
  } catch (error) {
    return { error: "Can not update!" };
  }
};
