-- CreateEnum
CREATE TYPE "ResponseStage" AS ENUM ('LEAD', 'INTERESTED', 'CONVERTED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "stage" "ResponseStage" NOT NULL DEFAULT 'LEAD',
ALTER COLUMN "interest" DROP NOT NULL;
