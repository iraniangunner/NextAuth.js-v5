"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export const DashboardNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-x-2">
      <Button asChild variant="outline">
        <Link href="/">
          <FaRegArrowAltCircleLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/dashboard" ? "default" : "outline"}
      >
        <Link href="/dashboard">
          <MdOutlineDashboardCustomize className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/settings" ? "default" : "outline"}
      >
        <Link href="/settings">
          <IoSettingsOutline className="h-4 w-4 mr-2" />
          Settings
        </Link>
      </Button>
    </div>
  );
};
