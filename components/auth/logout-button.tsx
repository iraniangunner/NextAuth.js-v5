"use client";
import { DropdownItem } from "flowbite-react";
import { logout } from "@/actions/logout";

export default function LogoutButton() {
  const onClick = () => logout();
  return <DropdownItem onClick={onClick}>Sign Out</DropdownItem>;
}
