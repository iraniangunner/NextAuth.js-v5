"use client";

import { signOut } from "next-auth/react";

// import { logout } from "@/actions/logout";

export const SettingsLogoutButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const onClick = () => signOut();

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
