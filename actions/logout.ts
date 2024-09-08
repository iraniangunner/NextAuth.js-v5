"use server";
import { signOut } from "@/auth";

export const logout = async (formData:FormData) => {
  //some server stuff
  await signOut({
    redirectTo: "/",
  });
};
