"use client";
import { DropdownItem } from "flowbite-react";
import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const onClick = () => logout();
  //const onClick = () => signOut();
  return <DropdownItem onClick={onClick}>Sign out</DropdownItem>;
}
