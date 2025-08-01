import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  console.log("Searching friends for userId:", userId);

  if (!userId) return new Response("Missing userId", { status: 400 });

  try {
    const res = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            user1Id: userId,
          },
          {
            user2Id: userId,
          },
        ],
      },
      include: {
        user1: true,
        user2: true,
      },
    });
    const friends = res.map((friendship) =>
      friendship.user1Id === userId ? friendship.user2 : friendship.user1
    );
    return new Response(JSON.stringify(friends), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch friends", { status: 500 });
  }
}
