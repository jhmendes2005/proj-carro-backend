/*
  Warnings:

  - The `destaque` column on the `vehicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "destaque",
ADD COLUMN     "destaque" BOOLEAN NOT NULL DEFAULT false;
