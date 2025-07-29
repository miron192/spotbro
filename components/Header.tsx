import Link from "next/link";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendar } from "react-icons/fa6";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex  p-3 sticky top-0 z-50 sm:justify-between bg-white/5 w-full flex-col sm:flex-row items-center backdrop-blur-lg shadow-md rounded-b-2xl mx-auto">
      <Link href="/" className="text-lg font-bold text-white">
        Spot<span className="text-green-500">Bro</span>
      </Link>
      {session ? (
        <div className="flex gap-4 text-2xl text-white">
          <Link href="/profile">
            <CgProfile className="inline-block mr-1 transition-transform duration-200 hover:scale-110" />
          </Link>
          <Link href="/sessions">
            <FaRegCalendar className="inline-block mr-1 transition-transform duration-200 hover:scale-110" />
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
      )}
    </header>
  );
};

export default Header;
