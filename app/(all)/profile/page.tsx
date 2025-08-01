import ActivityToday from "@/components/ActivityToday";
import FriendsList from "@/components/FriendsList";
import SearchFriend from "@/components/SearchFriend";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <header className="flex flex-col sm:flex-row items-center justify-between text-gray-200 p-4 rounded-xl mt-4 shadow-md bg-white/5 backdrop-blur-sm gap-6 sm:gap-0">
        {/* Profil + info */}
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            src={session?.user?.image || ""}
            alt="Profile Image"
            width={100}
            height={100}
            priority
          />
          <div>
            <h2 className="text-lg font-semibold">
              {session?.user?.name || ""}
            </h2>
            <p className="text-gray-400 text-sm">
              {session?.user?.email || ""}
            </p>
            <p className="text-sm mt-1">{session?.user?.bio || ""}</p>
          </div>
        </div>

        {/* Buton Edit Profile */}
        <div>
          <Link
            href="/profile/settings"
            className="inline-block px-5 py-2 border-2 border-white/20 text-white font-medium rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md bg-white/30 hover:bg-white/50 transition-all duration-200"
          >
            Edit Profile
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto mt-8 bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 sm:gap-0">
          <h3 className="text-xl font-semibold">Your SpotBros</h3>
          <SearchFriend fromUserId={session?.user?.id || ""} />
        </div>

        <FriendsList userId={session?.user?.id || ""} />
      </section>

      <ActivityToday user={session?.user} />

      <div className="h-5"></div>
    </>
  );
};

export default ProfilePage;
