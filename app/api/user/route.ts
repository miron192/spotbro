import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { dailyLogs: true, dailyCalories: true },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    if (user) {
      const today = new Date().toISOString().slice(0, 10);
      user.dailyLogs = user.dailyLogs.filter(
        (log) => log.date.toISOString().slice(0, 10) === today
      );
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
