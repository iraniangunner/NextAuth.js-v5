import { auth, signOut } from "@/auth";
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
import LogoutButton from "../auth/logout-button";
import Link from "next/link";

export default async function NavBar() {
  const session = await auth();
  const user = session?.user;

  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>
      {!session ? (
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
      ) : (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            className="z-[900]"
            label={
              <Avatar
                alt="User settings"
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
            {/* <DropdownItem href="/dashboard">Dashboard</DropdownItem> */}
            <DropdownItem href="/settings">Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <LogoutButton />
          </Dropdown>
          <NavbarToggle />
        </div>
      )}

      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
