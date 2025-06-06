/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import type {
  PaymentFilters,
  PaymentResponse,
  StatsResponse,
} from "@/type/payment";
import { checkAccess } from "./helper";

export type PaymentWithParts = {
  id: string;
  name: string;
  qualification: string;
  phoneNumber: string;
  email: string;
  source: string;
  collegeName: string;
  courseFee: number;
  paymentStatus: string;
  payment: number;
  collegePayment: number;
  agentCommission: number;
  bankCommission: number;
  netProfit: number;
  enrollmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  parts: {
    id: string;
    amount: number;
    paidAt: Date;
    paymentId: string;
  }[];
};

export type CreatePaymentData = {
  name: string;
  qualification: string;
  phoneNumber: string;
  email: string;
  source: string;
  collegeName: string;
  courseFee: number;
  paymentStatus: string;
  collegePayment: number;
  agentCommission: number;
  bankCommission: number;
  enrollmentDate: Date;
  parts: {
    amount: number;
    paidAt: Date;
  }[];
};

export type UpdatePaymentData = {
  id: string;
  name: string;
  qualification: string;
  phoneNumber: string;
  email: string;
  source: string;
  collegeName: string;
  courseFee: number;
  paymentStatus: string;
  collegePayment: number;
  agentCommission: number;
  bankCommission: number;
  enrollmentDate: Date;
  parts: {
    id?: string;
    amount: number;
    paidAt: Date;
  }[];
};

// Create a new payment with parts
export async function createPayment(data: CreatePaymentData) {
  checkAccess();
  try {
    const totalPayment = data.parts.reduce((sum, part) => sum + part.amount, 0);
    const netProfit =
      totalPayment -
      data.collegePayment -
      data.agentCommission -
      data.bankCommission;

    const payment = await prisma.payment.create({
      data: {
        name: data.name,
        qualification: data.qualification,
        phoneNumber: data.phoneNumber,
        email: data.email,
        source: data.source,
        collegeName: data.collegeName,
        courseFee: data.courseFee,
        paymentStatus: data.paymentStatus,
        payment: totalPayment,
        collegePayment: data.collegePayment,
        agentCommission: data.agentCommission,
        bankCommission: data.bankCommission,
        netProfit: netProfit,
        enrollmentDate: data.enrollmentDate,
        parts: {
          create: data.parts.map((part) => ({
            amount: part.amount,
            paidAt: part.paidAt,
          })),
        },
      },
      include: {
        parts: true,
      },
    });

    return { success: true, data: payment };
  } catch (error) {
    console.error("Error creating payment:", error);
    return { success: false, error: "Failed to create payment" };
  }
}

// Update a payment and its parts
export async function updatePayment(data: UpdatePaymentData) {
  checkAccess();
  try {
    // Calculate totals
    const totalPayment = data.parts.reduce((sum, part) => sum + part.amount, 0);
    const netProfit =
      totalPayment -
      data.collegePayment -
      data.agentCommission -
      data.bankCommission;

    // Separate existing parts from new parts
    const existingParts = data.parts.filter((part) => part.id);
    const newParts = data.parts.filter((part) => !part.id);

    // Get current parts to find which ones to delete
    const currentPayment = await prisma.payment.findUnique({
      where: { id: data.id },
      include: { parts: true },
    });

    if (!currentPayment) {
      return { success: false, error: "Payment not found" };
    }

    const existingPartIds = existingParts
      .map((part) => part.id)
      .filter(Boolean);
    const partsToDelete = currentPayment.parts.filter(
      (part) => !existingPartIds.includes(part.id)
    );

    // Update payment with transaction
    const payment = await prisma.$transaction(async (tx) => {
      // Delete removed parts
      if (partsToDelete.length > 0) {
        await tx.paymentPart.deleteMany({
          where: {
            id: { in: partsToDelete.map((part) => part.id) },
          },
        });
      }

      // Update existing parts
      for (const part of existingParts) {
        if (part.id) {
          await tx.paymentPart.update({
            where: { id: part.id },
            data: {
              amount: part.amount,
              paidAt: part.paidAt,
            },
          });
        }
      }

      // Create new parts
      if (newParts.length > 0) {
        await tx.paymentPart.createMany({
          data: newParts.map((part) => ({
            amount: part.amount,
            paidAt: part.paidAt,
            paymentId: data.id,
          })),
        });
      }

      // Update payment
      return await tx.payment.update({
        where: { id: data.id },
        data: {
          name: data.name,
          qualification: data.qualification,
          phoneNumber: data.phoneNumber,
          email: data.email,
          source: data.source,
          collegeName: data.collegeName,
          courseFee: data.courseFee,
          paymentStatus: data.paymentStatus,
          payment: totalPayment,
          collegePayment: data.collegePayment,
          agentCommission: data.agentCommission,
          bankCommission: data.bankCommission,
          netProfit: netProfit,
          enrollmentDate: data.enrollmentDate,
        },
        include: {
          parts: {
            orderBy: { paidAt: "asc" },
          },
        },
      });
    });

    return { success: true, data: payment };
  } catch (error) {
    console.error("Error updating payment:", error);
    return { success: false, error: "Failed to update payment" };
  }
}

export async function getPaymentsWithFilter(
  filters: PaymentFilters
): Promise<PaymentResponse> {
  try {
    const { search, status, dateFrom, dateTo, page, limit } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phoneNumber: { contains: search, mode: "insensitive" } },
        { collegeName: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status && status !== "all") {
      where.paymentStatus = status;
    }

    if (dateFrom || dateTo) {
      where.enrollmentDate = {};
      if (dateFrom) {
        where.enrollmentDate.gte = dateFrom;
      }
      if (dateTo) {
        where.enrollmentDate.lte = dateTo;
      }
    }

    // Get total count for pagination
    const totalCount = await prisma.payment.count({ where });
    const totalPages = Math.ceil(totalCount / limit);

    // Get payments with parts
    const payments = await prisma.payment.findMany({
      where,
      include: {
        parts: {
          orderBy: {
            paidAt: "asc",
          },
        },
      },
      orderBy: {
        enrollmentDate: "desc",
      },
      skip,
      take: limit,
    });

    return {
      success: true,
      data: {
        payments: payments.map((payment) => ({
          ...payment,
          courseFee: Number(payment.courseFee),
          payment: Number(payment.payment),
          collegePayment: Number(payment.collegePayment),
          agentCommission: Number(payment.agentCommission),
          bankCommission: Number(payment.bankCommission),
          netProfit: Number(payment.netProfit),
          enrollmentDate: payment.enrollmentDate.toISOString(),
          parts: payment.parts.map((part) => ({
            ...part,
            amount: Number(part.amount),
            paidAt: part.paidAt.toISOString(),
          })),
        })),
        pagination: {
          totalPages,
          currentPage: page,
          totalCount,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    return {
      success: false,
      error: "Failed to fetch payments",
    };
  }
}

export async function getPaymentStats(): Promise<StatsResponse> {
  try {
    const [totalPayments, totalRevenue, paidPayments, pendingPayments] =
      await Promise.all([
        prisma.payment.count(),
        prisma.payment.aggregate({
          _sum: {
            payment: true,
          },
        }),
        prisma.payment.count({
          where: {
            paymentStatus: "paid",
          },
        }),
        prisma.payment.count({
          where: {
            paymentStatus: "installment",
          },
        }),
      ]);

    const averagePayment =
      totalPayments > 0
        ? Number(totalRevenue._sum.payment || 0) / totalPayments
        : 0;

    return {
      success: true,
      data: {
        totalPayments,
        totalRevenue: Number(totalRevenue._sum.payment || 0),
        paidPayments,
        pendingPayments,
        averagePayment: Math.round(averagePayment),
      },
    };
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    return {
      success: false,
      error: "Failed to fetch payment statistics",
    };
  }
}

export async function deletePayment(
  id: string
): Promise<{ success: boolean; error?: string }> {
  checkAccess();
  try {
    await prisma.paymentPart.deleteMany({
      where: {
        paymentId: id,
      },
    });

    // Delete the payment
    await prisma.payment.delete({
      where: {
        id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting payment:", error);
    return {
      success: false,
      error: "Failed to delete payment",
    };
  }
}
