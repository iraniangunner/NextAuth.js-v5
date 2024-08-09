// "use client"

import { auth, signOut } from "@/auth";
// import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      <h1>Settins Page</h1>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
          // redirect("/auth/login")
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
