-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_eligibilitySubmissionId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_responseId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentPart" DROP CONSTRAINT "PaymentPart_paymentId_fkey";

-- DropTable
DROP TABLE "EligibilitySubmission";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "PaymentPart";

-- DropTable
DROP TABLE "Response";

-- DropEnum
DROP TYPE "NoteType";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "ResponseStage";

