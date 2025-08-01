/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `DailyCalories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DailyCalories_userId_date_key" ON "DailyCalories"("userId", "date");
