/*
  Warnings:

  - The primary key for the `Pqrs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Pqrs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `pqrsId` on the `PqrsResponse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "PqrsResponse" DROP CONSTRAINT "PqrsResponse_pqrsId_fkey";

-- AlterTable
ALTER TABLE "Pqrs" DROP CONSTRAINT "Pqrs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Pqrs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PqrsResponse" DROP COLUMN "pqrsId",
ADD COLUMN     "pqrsId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "PqrsResponse_pqrsId_createdAt_idx" ON "PqrsResponse"("pqrsId", "createdAt");

-- AddForeignKey
ALTER TABLE "PqrsResponse" ADD CONSTRAINT "PqrsResponse_pqrsId_fkey" FOREIGN KEY ("pqrsId") REFERENCES "Pqrs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
