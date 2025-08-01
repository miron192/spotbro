import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fromUserId, toUserEmail } = body;

    if (!fromUserId || !toUserEmail) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const toUser = await prisma.user.findUnique({
      where: { email: toUserEmail },
    });

    if (!toUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (fromUserId === toUser.id) {
      return NextResponse.json(
        { error: "You can't friend yourself" },
        { status: 400 }
      );
    }

    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        requesterId: fromUserId,
        receiverId: toUser.id,
        status: "pending",
      },
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "Request already sent" },
        { status: 409 }
      );
    }

    const newRequest = await prisma.friendRequest.create({
      data: {
        requesterId: fromUserId,
        receiverId: toUser.id,
        status: "pending",
      },
    });

    return NextResponse.json({
      message: "Friend request sent",
      request: newRequest,
    });
  } catch (error) {
    console.error("Friend request error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const requests = await prisma.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: "pending",
      },
      include: {
        requester: true,
      },
    });
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
