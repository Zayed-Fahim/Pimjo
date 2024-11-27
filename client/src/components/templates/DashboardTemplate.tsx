"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const DashboardTemplate = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return <h1>This is the dashboard template</h1>;
};

export default DashboardTemplate;
