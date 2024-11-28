"use client";
import { logout } from "@/actions/authAction";
import { Mouse, User } from "@/constant";
import { useSession } from "next-auth/react";
import { Button, Link } from "@/components/atoms";
import { Popover } from "@/components/molecules";

const Navbar = () => {
  const { data: session, status } = useSession();

  let username = session?.user?.username;
  if (username && username.includes("_")) {
    username = username.split("_").join(" ");
  }

  return (
    <div className="border-b border-zinc-700">
      <div className="max-w-full px-5 md:px-0 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto py-5 flex items-center">
        <div className="flex w-full justify-between items-center">
          <Link href="/me">
            <div className="text-foreground font-semibold text-xl tracking-tight flex items-center gap-2">
              <Mouse className="w-6 h-6" />
              <span>Task Nest</span>
            </div>
          </Link>

          <div className="relative flex gap-x-3 items-center">
            {status === "loading" ? (
              <div className="h-6 w-[200px] animate-pulse bg-zinc-800 rounded" />
            ) : (
              <p className="transition-all duration-1000 ease-in-out">
                Welcome,{" "}
                <span className="text-sm md:text-base md:font-semibold">
                  {username}
                </span>
              </p>
            )}

            <Popover
              trigger={<User className="w-8 h-8 cursor-pointer" />}
              className="right-0 top-10 border border-zinc-800 w-[160px] shadow-xl rounded-sm"
            >
              <Button
                onClick={() => logout()}
                className="w-full px-4 py-2.5 hover:bg-zinc-900"
              >
                Logout
              </Button>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
