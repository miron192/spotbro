import UserPage from "@/components/UserPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page = async ({ params }: any) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (id === session?.user?.id) {
    redirect("/profile");
  }
  if (!session) {
    return (
      <p className="text-red-400">You must be logged in to view this page.</p>
    );
  }
  return <UserPage id={id} loggedInUserId={session?.user?.id || null} />;
};

export default page;
