-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activityLevel" DROP NOT NULL,
ALTER COLUMN "activityLevel" SET DATA TYPE TEXT;
