import { DashboardTemplate } from "@/components/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Task Nest",
  description: "Your personal task management dashboard.",
  keywords: ["dashboard, task Nest, tasks"],
};

const DashboardPage = () => {
  return <DashboardTemplate />;
};

export default DashboardPage;
