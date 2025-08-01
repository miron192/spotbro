import { prisma } from "@/lib/prisma"; // asigură-te că ai acest path corect
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, date, startTime, endTime, workout } = body;

    if (!userId || !date || !startTime || !endTime || !workout) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const newLog = await prisma.dailyLog.create({
      data: {
        userId,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        workout,
      },
    });

    return NextResponse.json(newLog);
  } catch (error) {
    console.error("Failed to save log:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const logs = await prisma.dailyLog.findMany({
      where: { userId },
      orderBy: { startTime: "asc" },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("GET /api/daily-log error", error);
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
