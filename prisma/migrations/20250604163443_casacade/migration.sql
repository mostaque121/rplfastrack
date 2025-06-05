-- DropForeignKey
ALTER TABLE "PaymentPart" DROP CONSTRAINT "PaymentPart_paymentId_fkey";

-- AddForeignKey
ALTER TABLE "PaymentPart" ADD CONSTRAINT "PaymentPart_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
