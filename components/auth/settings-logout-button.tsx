"use client";
// import { logout } from "@/actions/logout";

import {signOut} from "next-auth/react"


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
