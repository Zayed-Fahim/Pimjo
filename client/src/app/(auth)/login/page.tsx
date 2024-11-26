import { LoginTemplate } from "@/components/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Task Nest",
  description: "Login to your Task Nest account.",
  keywords: ["login, task Nest, account"],
};

const LoginPage = () => {
  return <LoginTemplate />;
};

export default LoginPage;
