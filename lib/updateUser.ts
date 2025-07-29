import { prisma } from "@/lib/prisma";

export async function updateUser(
  id: string,
  data: Partial<{
    name: string;
    weight: number;
    height: number;
    activityLevel: string;
  }>
) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });

  return updatedUser;
}
