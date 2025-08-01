import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendar } from "react-icons/fa6";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";
import { MdOutlineNotifications } from "react-icons/md";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header
      className="
    sticky top-0 z-50
    w-screen max-w-full
    bg-white/5 backdrop-blur-lg
    shadow-md rounded-b-2xl
    flex flex-col sm:flex-row
    items-center
    px-3 py-2
    sm:justify-between
  "
    >
      <Link
        href="/"
        className="text-lg font-bold text-white hidden md:inline-block"
      >
        Spot<span className="text-green-500">Bro</span>
      </Link>
      {session ? (
        <div className="flex gap-4 text-2xl text-white md:justify-between">
          <Link href="/profile">
            <CgProfile className="inline-block mr-1 transition-transform duration-200 hover:scale-110" />
          </Link>
          <Link href="/sessions">
            <FaRegCalendar className="inline-block mr-1 transition-transform duration-200 hover:scale-110" />
          </Link>
          <Link href="/profile/requests">
            <MdOutlineNotifications className="inline-block mr-1 transition-transform duration-200 hover:scale-110" />
          </Link>

          <LogoutButton />
        </div>
      ) : (
        <Link
          className="px-5 py-2 border-2 border-black text-white font-medium rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md bg-white/30 hover:bg-white/50 transition-all duration-200"
          href="/api/auth/signin"
        >
          Login
        </Link>
      )}{" "}
    </header>
  );
};

export default Header;
