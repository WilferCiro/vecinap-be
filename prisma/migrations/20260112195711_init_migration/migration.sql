/*
  Warnings:

  - The `role` column on the `UserResidential` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserResidentialRole" AS ENUM ('ADMIN', 'RESIDENT');

-- AlterTable
ALTER TABLE "UserResidential" DROP COLUMN "role",
ADD COLUMN     "role" "UserResidentialRole";
