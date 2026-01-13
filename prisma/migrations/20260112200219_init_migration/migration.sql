/*
  Warnings:

  - The `type` column on the `Pqrs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PqrsType" AS ENUM ('REQUEST', 'COMPLAINT', 'CLAIM', 'SUGGESTION');

-- AlterTable
ALTER TABLE "Pqrs" DROP COLUMN "type",
ADD COLUMN     "type" "PqrsType" NOT NULL DEFAULT 'REQUEST';
