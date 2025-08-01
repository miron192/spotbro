import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, calories, date } = body;

    if (!userId || calories === undefined) {
      return NextResponse.json(
        { error: "Missing userId or calories" },
        { status: 400 }
      );
    }

    const dayStart = date ? new Date(date) : new Date();
    dayStart.setHours(0, 0, 0, 0);

    const updated = await prisma.dailyCalories.upsert({
      where: {
        userId_date: {
          userId,
          date: dayStart,
        },
      },
      update: { calories },
      create: {
        userId,
        date: dayStart,
        calories,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);

    const dailyCalories = await prisma.dailyCalories.findUnique({
      where: {
        userId_date: {
          userId,
          date: dayStart,
        },
      },
    });

    if (!dailyCalories) {
      return NextResponse.json({ calories: 0 });
    }

    return NextResponse.json(dailyCalories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch calories" },
      { status: 500 }
    );
  }
}
