"use client";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { ExtendedUser } from "@/next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ClientPage = () => {
  const user = useCurrentUser();

  // const { update } = useSession();

  // useEffect(() => {
  //   update();
  // }, []);

  return <UserInfo label="Client Component" user={user} />;
};

export default ClientPage;
