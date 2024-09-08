"use client"

// import { signOut } from "@/auth";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div>
      <h5>Are you sure you want to sign out?</h5>
      {/* <form
        action={async (formData) => {
          "use server";
          await signOut({ redirectTo: "/auth/login" });
        }}
      > */}
        <button onClick={() => signOut({callbackUrl:"/auth/login"})}>Sign out</button>
      {/* </form> */}
    </div>
  );
}
