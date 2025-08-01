import { prisma } from "@/lib/prisma";

export async function upsertDailyCalories(
  userId: string,
  calories: number,
  date: Date = new Date()
) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0); // normalizează la ora 00:00

  const result = await prisma.dailyCalories.upsert({
    where: {
      userId_date: {
        userId,
        date: dayStart,
      },
    },
    update: {
      calories,
    },
    create: {
      userId,
      date: dayStart,
      calories,
    },
  });

  return result;
}
