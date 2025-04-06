/*
  Warnings:

  - Changed the type of `nextWaterDate` on the `Plant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "nextWaterDate",
ADD COLUMN     "nextWaterDate" TIMESTAMP(3) NOT NULL;
