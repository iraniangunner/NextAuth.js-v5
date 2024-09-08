"use client";

import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

// import { logout } from "@/actions/logout";

export const SettingsLogoutButton = () => {
  // const onClick = () => logout();
  // const onClick = () => signOut();
  return (
    <button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
      Sign out
    </button>
  );
};
