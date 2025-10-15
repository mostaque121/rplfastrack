/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import type {
  CreatePaymentData,
  UpdatePaymentData,
} from "@/app/(admin)/lib/zod";
import {
  createPaymentSchema,
  updatePaymentSchema,
} from "@/app/(admin)/lib/zod";
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

// Helper to centralize calculation logic
const calculateTotals = (data: {
  parts: { amount: number }[];
  collegePayment: number;
  agentCommission: number;
  bankCommission: number;
}) => {
  const payment = data.parts.reduce((sum, part) => sum + part.amount, 0);
  const netProfit =
    payment - data.collegePayment - data.agentCommission - data.bankCommission;
  return { payment, netProfit };
};

// CREATE ACTION
export async function createPayment(data: CreatePaymentData) {
  const validation = createPaymentSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Invalid input data." };
  }

  const { parts, ...paymentData } = validation.data;
  const totals = calculateTotals(validation.data);

  try {
    checkAccess();
    const newPayment = await prisma.payment.create({
      data: { ...paymentData, ...totals, parts: { create: parts } },
      include: { parts: true },
    });
    return { success: true, data: newPayment };
  } catch (error) {
    console.error("Error creating payment:", error);
    return {
      success: false,
      error: "Database error: Failed to create payment.",
    };
  }
}

// UPDATE ACTION
export async function updatePayment(data: UpdatePaymentData) {
  const validation = updatePaymentSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Invalid input data." };
  }

  const { id, parts, ...paymentData } = validation.data;
  const totals = calculateTotals(validation.data);

  try {
    checkAccess();
    const updatedPayment = await prisma.$transaction(async (tx) => {
      // Sync payment parts: update existing, create new, and delete removed ones.
      const existingParts = await tx.paymentPart.findMany({
        where: { paymentId: id },
        select: { id: true },
      });
      const existingPartIds = new Set(existingParts.map((p) => p.id));
      const incomingParts = new Map(parts.map((p) => [p.id, p]));

      // Operations to run in parallel
      const operations = [];

      // Delete parts that are no longer present
      const idsToDelete = [...existingPartIds].filter(
        (partId) => !incomingParts.has(partId)
      );
      if (idsToDelete.length > 0) {
        operations.push(
          tx.paymentPart.deleteMany({ where: { id: { in: idsToDelete } } })
        );
      }

      // Update or create parts
      for (const part of parts) {
        if (part.id && existingPartIds.has(part.id)) {
          // Update existing
          operations.push(
            tx.paymentPart.update({
              where: { id: part.id },
              data: { amount: part.amount, paidAt: part.paidAt },
            })
          );
        } else {
          // Create new
          operations.push(
            tx.paymentPart.create({ data: { ...part, paymentId: id } })
          );
        }
      }

      await Promise.all(operations);

      // Finally, update the parent payment record
      return tx.payment.update({
        where: { id },
        data: { ...paymentData, ...totals },
        include: { parts: { orderBy: { paidAt: "asc" } } },
      });
    });

    return { success: true, data: updatedPayment };
  } catch (error) {
    console.error("Error updating payment:", error);
    return {
      success: false,
      error: "Database error: Failed to update payment.",
    };
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
    const [counts, aggregates] = await Promise.all([
      prisma.payment.groupBy({
        by: ["paymentStatus"],
        _count: true,
      }),
      prisma.payment.aggregate({
        _sum: {
          payment: true,
          courseFee: true,
        },
        _count: true,
      }),
    ]);

    let paidPayments = 0;
    let pendingPayments = 0;

    for (const group of counts) {
      if (group.paymentStatus === "paid") paidPayments = group._count;
      if (group.paymentStatus === "installment") pendingPayments = group._count;
    }

    const totalPayments = aggregates._count;
    const totalRevenue = Number(aggregates._sum.payment || 0);
    const totalCourseFee = Number(aggregates._sum.courseFee || 0);
    const averagePayment =
      totalPayments > 0 ? Math.round(totalRevenue / totalPayments) : 0;

    return {
      success: true,
      data: {
        totalPayments,
        totalRevenue,
        totalCourseFee,
        paidPayments,
        pendingPayments,
        averagePayment,
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

export async function updatePaymentNote(id: string, note: string) {
  checkAccess();
  try {
    const payment = await prisma.payment.update({
      where: { id },
      data: { additionalNote: note },
    });

    return { success: true, data: payment };
  } catch (error) {
    console.error("Error updating payment note:", error);
    return { success: false, error: "Failed to update payment note" };
  }
}
