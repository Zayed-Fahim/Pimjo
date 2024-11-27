import { SignupTemplate } from "@/components/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Task Nest",
  description: "Register to your Task Nest account.",
  keywords: ["register, task Nest, account"],
};

const Signup = () => {
  return <SignupTemplate />;
};

export default Signup;
