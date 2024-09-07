"use client";
import { DropdownItem } from "flowbite-react";
import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const onClick = () => logout();
  // const onClick = () => signOut({callbackUrl:"/auth/login"});
  return <button onClick={onClick}>Sign Out</button>;
}
