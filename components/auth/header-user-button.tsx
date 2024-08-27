import { currentUser } from "@/lib/auth";
import Link from "next/link";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import LogoutButton from "./logout-button";
import { auth } from "@/auth";

export const HeaderUserButton = async () => {
  const session = await auth();

  const user = session?.user;
  if (!user) {
    return (
      <div className="flex md:order-2">
        <Link
          href="/auth/login"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 text-center"
        >
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="flex md:order-2">
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
        </DropdownHeader>

        <Link href="/settings">
          <DropdownItem>Settings</DropdownItem>
        </Link>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownDivider />
        <LogoutButton />
      </Dropdown>
      <NavbarToggle />
    </div>
  );
};
