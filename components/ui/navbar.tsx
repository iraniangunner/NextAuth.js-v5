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
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { NavbarAvatar } from "../auth/navbar-avatar";
import LoadingSpinner from "./loading";

export default async function NavBar() {
  const session = await auth();
  const user = session?.user;

  // const { data: session, status } = useSession();
  // const user = session?.user;

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
      {!user ? (
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
          <Suspense fallback={<LoadingSpinner />}>
            <NavbarAvatar />
          </Suspense>
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
