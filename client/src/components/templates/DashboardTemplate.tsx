"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Tasks from "../organisms/Tasks";

const DashboardTemplate = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

  console.log(session?.accessToken);

  if (status === "unauthenticated") return null;

  return <Tasks />;
};

export default DashboardTemplate;
