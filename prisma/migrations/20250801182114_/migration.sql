/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `DailyCalories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DailyCalories_userId_createdAt_key";

-- AlterTable
ALTER TABLE "DailyCalories" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT (CURRENT_DATE);

-- CreateIndex
CREATE UNIQUE INDEX "DailyCalories_userId_date_key" ON "DailyCalories"("userId", "date");
