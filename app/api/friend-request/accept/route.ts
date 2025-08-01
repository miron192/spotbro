import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { requesterId, receiverId } = await req.json();

  if (!requesterId || !receiverId) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    const friendRequest = await prisma.friendRequest.findUnique({
      where: {
        requester_receiver_unique: {
          requesterId,
          receiverId,
        },
      },
    });
    if (!friendRequest || friendRequest.status !== "pending") {
      return new Response("Friend request not found or already handled", {
        status: 404,
      });
    }
    await prisma.friendRequest.update({
      where: {
        requester_receiver_unique: {
          requesterId,
          receiverId,
        },
      },
      data: {
        status: "accepted",
      },
    });

    await prisma.friendship.create({
      data: {
        user1Id: requesterId,
        user2Id: receiverId,
      },
    });

    return new Response("Friend request accepted", { status: 200 });
  } catch (error) {
    return new Response("Error accepting friend request", { status: 500 });
  }
}
