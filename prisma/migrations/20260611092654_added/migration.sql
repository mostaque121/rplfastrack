-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "soldAt" TIMESTAMP(3),
ADD COLUMN     "soldById" TEXT;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_soldById_fkey" FOREIGN KEY ("soldById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
