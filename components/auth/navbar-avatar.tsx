import { auth } from "@/auth";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  NavbarToggle,
} from "flowbite-react";
import LogoutButton from "../auth/logout-button";
import Link from "next/link";

export async function NavbarAvatar() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      <Dropdown
        arrowIcon={false}
        inline
        className="z-[900]"
        label={
          <Avatar
            alt="user"
            img={
              user?.image ||
              "https://avatar.iran.liara.run/public/boy?username=Ash"
            }
            rounded
          />
        }
      >
        <DropdownHeader>
          <span className="block text-sm">{user?.name}</span>
          <span className="block truncate text-sm font-medium">
            {user?.email}
          </span>
          <span>Role: {user?.role}</span>
        </DropdownHeader>
        <Link href="/settings">
          <DropdownItem>Settings</DropdownItem>
        </Link>
        <Link href="/dashboard">
          <DropdownItem>Dashboard</DropdownItem>
        </Link>
        <DropdownDivider />
        <LogoutButton />
      </Dropdown>
      <NavbarToggle />
    </>
  );
}
