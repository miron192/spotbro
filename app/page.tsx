import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/profile");
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl font-extrabold mb-4 text-center tracking-tight">
        Welcome to <span className="text-green-400">SpotBro</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8 text-center max-w-xl">
        The ultimate social network for{" "}
        <span className="font-semibold text-white">gymbros</span> who lift,
        spot, and grow together. 💪
      </p>

      <Link
        href="/api/auth/signin"
        className="bg-green-500 cursor-pointer hover:bg-green-600 text-black font-bold py-2 px-6 rounded-2xl transition-all shadow-md"
      >
        Get Started
      </Link>
    </main>
  );
}
