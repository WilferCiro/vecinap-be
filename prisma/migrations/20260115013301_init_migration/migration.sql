-- DropForeignKey
ALTER TABLE "PqrsResponse" DROP CONSTRAINT "PqrsResponse_pqrsId_fkey";

-- DropForeignKey
ALTER TABLE "PqrsResponse" DROP CONSTRAINT "PqrsResponse_responderId_fkey";

-- AlterTable
ALTER TABLE "Pqrs" ALTER COLUMN "subject" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "PqrsResponse" ADD CONSTRAINT "PqrsResponse_pqrsId_fkey" FOREIGN KEY ("pqrsId") REFERENCES "Pqrs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PqrsResponse" ADD CONSTRAINT "PqrsResponse_responderId_fkey" FOREIGN KEY ("responderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
