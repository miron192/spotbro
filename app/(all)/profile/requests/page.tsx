import Requests from "@/components/Requests";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex flex-col items-center justify-center text-white f p-4 rounded-xl mt-4 shadow-md bg-white/5 backdrop-blur-sm ">
      <h2 className="text-lg font-semibold">Friend Requests</h2>
      <div>
        <Requests user={session.user} />
      </div>
    </div>
  );
};

export default page;
