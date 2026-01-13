/*
  Warnings:

  - The `status` column on the `Pqrs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PqrsStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED');

-- AlterTable
ALTER TABLE "Pqrs" DROP COLUMN "status",
ADD COLUMN     "status" "PqrsStatus" NOT NULL DEFAULT 'OPEN';

-- CreateIndex
CREATE INDEX "Pqrs_userId_status_idx" ON "Pqrs"("userId", "status");
