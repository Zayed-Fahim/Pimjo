"use client";
import { logout } from "@/actions/authAction";
import { Mouse, User } from "@/constant";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button, Link } from "@/components/atoms";

const Navbar = () => {
  const { data: session } = useSession();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  let username = session?.user?.username;
  if (username && username.includes("_")) {
    username = username.split("_").join(" ");
  }

  const togglePopover = () => setIsPopoverOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="border-b border-zinc-700">
      <div className="max-w-7xl mx-auto py-5 flex items-center">
        <div className="flex w-full justify-between items-center">
          <Link href="/dashboard/me">
            <div className="text-foreground font-semibold text-xl tracking-tight flex items-center gap-2">
              <Mouse className="w-6 h-6" />
              <span>Task Nest</span>
            </div>
          </Link>

          <div className="relative flex gap-x-3 items-center" ref={popoverRef}>
            {username && (
              <p className="transition-all duration-1000 ease-in-out">
                Welcome, <span className="font-semibold">{username}</span>
              </p>
            )}

            <User className="w-8 h-8 cursor-pointer" onClick={togglePopover} />

            {isPopoverOpen && (
              <div className="absolute right-0 top-10 bg-white text-black w-[160px] rounded-sm py-2 shadow-md z-10">
                <Button
                  onClick={() => logout()}
                  className="w-full px-4 py-1 z-[12] border border-t-zinc-200 hover:bg-zinc-100 border-b-zinc-200"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
