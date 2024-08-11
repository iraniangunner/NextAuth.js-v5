import { auth, signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      <h1>Settins Page</h1>
      {JSON.stringify(session)}
      <img src={session?.user.image || ""} alt="" />
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/auth/login",
          });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
