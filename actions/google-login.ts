"use server";
import { signIn } from "@/auth";
import { OAthLoginSchema } from "@/schemas";

export const googleLogin = async (formData: FormData) => {
  const validatedFields = OAthLoginSchema.safeParse({
    callbackUrl: formData.get("callbackUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { callbackUrl } = validatedFields.data;

  await signIn("google", { redirectTo: callbackUrl });
};
