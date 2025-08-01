/*
  Warnings:

  - You are about to drop the column `date` on the `DailyCalories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,createdAt]` on the table `DailyCalories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DailyCalories_userId_date_key";

-- AlterTable
ALTER TABLE "DailyCalories" DROP COLUMN "date";

-- CreateIndex
CREATE UNIQUE INDEX "DailyCalories_userId_createdAt_key" ON "DailyCalories"("userId", "createdAt");
