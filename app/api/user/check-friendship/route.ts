import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user1 = searchParams.get("user1");
  const user2 = searchParams.get("user2");

  if (!user1 || !user2) {
    return new Response(JSON.stringify({ areFriends: false }), { status: 400 });
  }

  const friendship = await prisma.friendship.findFirst({
    where: {
      OR: [
        { user1Id: user1, user2Id: user2 },
        { user1Id: user2, user2Id: user1 },
      ],
    },
  });

  return new Response(JSON.stringify({ areFriends: Boolean(friendship) }), {
    status: 200,
  });
}
