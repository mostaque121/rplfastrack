-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "courseFee" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "payment" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "collegePayment" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "agentCommission" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bankCommission" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netProfit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "enrollmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentPart" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "PaymentPart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentPart" ADD CONSTRAINT "PaymentPart_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
