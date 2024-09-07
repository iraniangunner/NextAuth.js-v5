"use client";

import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

// import { logout } from "@/actions/logout";

export const SettingsLogoutButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const onClick = () => logout();
  // const onClick = () => signOut();
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
