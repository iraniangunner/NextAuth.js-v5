import { auth } from "@/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
} from "flowbite-react";
import Link from "next/link";
import { Suspense } from "react";
import { NavbarAvatar } from "../auth/navbar-avatar";
import LoadingSpinner from "./loading";

export default async function NavBar() {
  const session = await auth();
  const user = session?.user;

  // const session = await auth()
  // if (session?.error === "RefreshTokenError") {
  //   await signIn("google") // Force sign in to obtain a new set of access and refresh tokens
  // }


  
// export const fetchClient = async (url, options) => {
//   const session = await auth();
//   console.log(`From the fetchClient ${JSON.stringify(session.accessToken)}`);

//   return fetch(url, {
//     ...options,
//     headers: {
//       ...options?.headers,
//       ...(session && { Authorization: `Bearer ${session.accessToken}` }),
//     },
//   });
// };

  // const res = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/users`, {
  //   headers: { "Content-Type": "application/json" },
  // });

  // if(!res.ok) {
  //   if (res.status === 403) {
  //     console.log("Token Expired");
  //     redirect('/login');
  //   }
  // }

  // const users = await res.json() ?? [];

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
