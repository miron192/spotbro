import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

const ProfileSettingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className=" flex items-center justify-center px-4 py-12  text-white">
      <div className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Your Profile
        </h1>

        {/* Imagine profil */}
        {session.user?.image && (
          <div className="flex justify-center mb-6">
            <Image
              src={session.user.image}
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full ring-4 ring-white/30 shadow-md"
            />
          </div>
        )}

        <ProfileForm user={session.user} />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
