import { DropdownItem } from "flowbite-react";
import { signOut } from "@/auth";

export default function LogoutButton() {
  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     await signOut({
    //       redirectTo: "/auth/login",
    //     });
    //   }}
    // >
    // </form>
    <DropdownItem
      type="submit"
      onClick={async () => {
        "use server";
        await signOut({
        //   redirectTo: "/auth/login",
        redirectTo:"/"
        });
      }}
    >
      Sign Out
    </DropdownItem>
  );
}
