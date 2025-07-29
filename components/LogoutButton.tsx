"use client";

import { signOut } from "next-auth/react";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function LogoutButton() {
  return (
    <button onClick={() => signOut()} title="Logout">
      <RiLogoutBoxRLine className="inline-block cursor-pointer transition-transform duration-200 hover:scale-110" />
    </button>
  );
}
