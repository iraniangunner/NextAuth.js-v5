import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import { currentUser } from "@/lib/auth";
import { SettingsLogoutButton } from "@/components/auth/settings-logout-button";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import Link from "next/link";

export const UserButton = async () => {
  const user = await currentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <Link href="/settings">
          <DropdownMenuItem>
            <IoSettingsOutline className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard">
          <DropdownMenuItem>
          <MdOutlineDashboardCustomize className="h-4 w-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <SettingsLogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </SettingsLogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
