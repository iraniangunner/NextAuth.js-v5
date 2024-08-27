import { auth } from "@/auth";
// import { Navbar } from "flowbite-react";
import NavBar from "../ui/navbar";
// import ClientExample from "@/components/client-example"
import { SessionProvider } from "next-auth/react";

export default async function Header() {
  const session = await auth();
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      role: session.user.role,
      isOAuth: session.user.isOAuth,
      isTwoFactorEnabled: session.user.isTwoFactorEnabled,
    };
  }

  return (
    <SessionProvider session={session}>
      <NavBar />
    </SessionProvider>
  );
}