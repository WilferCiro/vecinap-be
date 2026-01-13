/*
  Warnings:

  - You are about to drop the column `buildingId` on the `CommonArea` table. All the data in the column will be lost.
  - You are about to drop the column `buildingId` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `buildingId` on the `UserResidential` table. All the data in the column will be lost.
  - You are about to drop the column `buildingId` on the `Visitor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,residenceId]` on the table `UserResidential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `residenceId` to the `CommonArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residenceId` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residenceId` to the `Pqrs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residenceId` to the `UserResidential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residenceId` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommonArea" DROP CONSTRAINT "CommonArea_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "UserResidential" DROP CONSTRAINT "UserResidential_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_buildingId_fkey";

-- DropIndex
DROP INDEX "CommonArea_buildingId_name_idx";

-- DropIndex
DROP INDEX "Notice_buildingId_createdAt_idx";

-- DropIndex
DROP INDEX "UserResidential_buildingId_idx";

-- DropIndex
DROP INDEX "UserResidential_userId_buildingId_key";

-- AlterTable
ALTER TABLE "CommonArea" DROP COLUMN "buildingId",
ADD COLUMN     "residenceId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "buildingId",
ADD COLUMN     "residenceId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pqrs" ADD COLUMN     "residenceId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PqrsResponse" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Residential" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserResidential" DROP COLUMN "buildingId",
ADD COLUMN     "residenceId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "buildingId",
ADD COLUMN     "residenceId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "CommonArea_residenceId_name_idx" ON "CommonArea"("residenceId", "name");

-- CreateIndex
CREATE INDEX "Notice_residenceId_createdAt_idx" ON "Notice"("residenceId", "createdAt");

-- CreateIndex
CREATE INDEX "UserResidential_residenceId_idx" ON "UserResidential"("residenceId");

-- CreateIndex
CREATE UNIQUE INDEX "UserResidential_userId_residenceId_key" ON "UserResidential"("userId", "residenceId");

-- AddForeignKey
ALTER TABLE "UserResidential" ADD CONSTRAINT "UserResidential_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Residential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pqrs" ADD CONSTRAINT "Pqrs_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Residential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Residential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonArea" ADD CONSTRAINT "CommonArea_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Residential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Residential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
