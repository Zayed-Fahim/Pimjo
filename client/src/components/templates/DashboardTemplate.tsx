"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardTemplate = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

  if (status === "unauthenticated") return null;

  return <h1>This is the dashboard template</h1>;
};

export default DashboardTemplate;
