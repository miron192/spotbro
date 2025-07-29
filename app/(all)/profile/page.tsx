import ActivityToday from "@/components/ActivityToday";
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
  const friends = [
    {
      name: "Andrei",
      nickname: "Leg Day King",
      image: "/friends/andrei.jpg",
      profileUrl: "/profile/andrei",
    },
  ];

  return (
    <>
      <header className="flex items-center justify-around text-gray-200 p-4 rounded-xl mt-4 shadow-md bg-white/5 backdrop-blur-sm ">
        <div className="flex items-center justify-around p-4 gap-4 ">
          <Image
            className="rounded-full"
            src={session?.user?.image || ""}
            alt="Profile Image"
            width={140}
            height={140}
          />
          <div>
            <h2 className="">{session?.user?.name || ""}</h2>
            <p className="text-gray-400 text-sm">
              {session?.user?.email || ""}
            </p>
            <p>Bio</p>
          </div>
        </div>
        <div className="px-5 py-2 border-2 border-white/20 text-white font-medium rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md bg-white/30 hover:bg-white/50 transition-all duration-200">
          <Link href={"/profile/settings"} className="">
            Edit Profile
          </Link>
        </div>
      </header>
      <section className="max-w-3xl mx-auto mt-8 bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-6">Your SpotBros</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {friends.map(({ name, nickname, image, profileUrl }) => (
            <Link
              href={profileUrl}
              key={name}
              className="flex flex-col items-center gap-2 hover:bg-white/10 rounded-lg p-4 transition"
            >
              <Image
                src={image}
                alt={name}
                width={80}
                height={80}
                className="rounded-full border border-white/20"
              />
              <p className="font-semibold text-center">{name}</p>
              <p className="text-green-400 italic text-sm text-center">
                {nickname}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <ActivityToday />
      <div className="h-5"></div>
    </>
  );
};

export default ProfilePage;
