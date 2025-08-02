import "../globals.css";
import Header from "@/components/Header";

import { Providers } from "../providers";

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen ">
      <Header />
      <div className="p-4">
        <Providers>{children}</Providers>
      </div>
    </div>
  );
}
