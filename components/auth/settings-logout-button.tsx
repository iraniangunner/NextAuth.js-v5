"use client";

import { logout } from "@/actions/logout";
import { signOut } from "@/auth";


export const SettingsLogoutButton = () => {
  const onClick = () => logout();
  // const onClick = () => signOut();
  return (
    <button onClick={onClick}>
      Sign out
    </button>
  );
};
