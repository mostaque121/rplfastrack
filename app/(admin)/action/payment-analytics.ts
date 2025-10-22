/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import type { AnalyticsData, FilterParams } from "@/type/type";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  isWithinInterval,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { PaymentWithParts } from "./payments";

export async function getPaymentAnalytics(filters: FilterParams) {
  try {
    const { startDate, endDate, previousStartDate } = getDateRanges(filters);

    // Get current period data
    const currentPeriodPayments = await prisma.payment.findMany({
      where: {
        enrollmentDate: {
          gte: startDate,
          lte: endDate,
        },
        paymentStatus: "paid",
      },
      include: {
        parts: true,
      },
      orderBy: {
        enrollmentDate: "asc",
      },
    });

    // Get previous period data for comparison
    const previousPeriodPayments = await prisma.payment.findMany({
      where: {
        enrollmentDate: {
          gte: previousStartDate,
          lt: startDate,
        },
        paymentStatus: "paid",
      },
      include: {
        parts: true,
      },
    });

    // Calculate overview metrics
    const overview = calculateOverviewMetrics(
      currentPeriodPayments,
      previousPeriodPayments
    );

    // Generate trend data
    const trends = await generateTrendData(
      currentPeriodPayments,
      startDate,
      endDate,
      filters.type
    );

    // Get distributions
    const distributions = await getDistributions(currentPeriodPayments);

    // Generate insights
    const insights = generateInsights(currentPeriodPayments, overview);

    const analyticsData: AnalyticsData = {
      overview,
      trends,
      distributions,
      insights,
    };

    return { success: true, data: analyticsData };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { success: false, error: "Failed to fetch analytics data" };
  }
}

function getDateRanges(filters: FilterParams) {
  const now = new Date();
  let startDate: Date | undefined;
  let endDate: Date | undefined = now;
  let previousStartDate: Date | undefined;

  if (filters.type === "timeRange" && filters.timeRange) {
    switch (filters.timeRange) {
      case "7d":
        startDate = subDays(now, 7);
        previousStartDate = subDays(startDate, 7);
        break;
      case "30d":
        startDate = subDays(now, 30);
        previousStartDate = subDays(startDate, 30);
        break;
      case "90d":
        startDate = subDays(now, 90);
        previousStartDate = subDays(startDate, 90);
        break;
      case "6m":
        startDate = subMonths(now, 6);
        previousStartDate = subMonths(startDate, 6);
        break;
      case "1y":
        startDate = subMonths(now, 12);
        previousStartDate = subMonths(startDate, 12);
        break;
      case "All":
        startDate = undefined; // means no lower bound
        previousStartDate = undefined; // no previous range
        break;
      default:
        startDate = subDays(now, 30);
        previousStartDate = subDays(startDate, 30);
    }
  } else if (filters.type === "dateRange" && filters.dateRange) {
    startDate = filters.dateRange.from;
    endDate = filters.dateRange.to;
    const daysDiff = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    previousStartDate = subDays(startDate, daysDiff);
  } else if (filters.type === "monthFilter" && filters.monthFilter) {
    const [year, month] = filters.monthFilter.split("-");
    startDate = startOfMonth(
      new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    );
    endDate = endOfMonth(startDate);
    previousStartDate = startOfMonth(subMonths(startDate, 1));
  } else {
    // Default to last 30 days
    startDate = subDays(now, 30);
    previousStartDate = subDays(startDate, 30);
  }

  return { startDate, endDate, previousStartDate };
}

function calculateOverviewMetrics(
  currentPayments: PaymentWithParts[],
  previousPayments: PaymentWithParts[]
) {
  // Current period calculations
  const totalRevenue = currentPayments.reduce((sum, p) => sum + p.payment, 0);
  const totalProfit = currentPayments.reduce((sum, p) => sum + p.netProfit, 0);
  const totalStudents = currentPayments.length;
  const totalEnrollments = currentPayments.filter(
    (p) => p.enrollmentDate
  ).length;
  const averagePayment = totalStudents > 0 ? totalRevenue / totalStudents : 0;
  const averageProfit = totalStudents > 0 ? totalProfit / totalStudents : 0;

  // Previous period calculations
  const previousRevenue = previousPayments.reduce(
    (sum, p) => sum + p.payment,
    0
  );
  const previousProfit = previousPayments.reduce(
    (sum, p) => sum + p.netProfit,
    0
  );
  const previousStudents = previousPayments.length;
  const previousEnrollments = previousPayments.filter(
    (p) => p.enrollmentDate
  ).length;
  const previousAvgPayment =
    previousStudents > 0
      ? previousRevenue / previousStudents
      : previousRevenue / 1;
  const previousAvgProfit =
    previousStudents > 0
      ? previousProfit / previousStudents
      : previousProfit / 1;

  // Calculate growth percentages
  const revenueGrowth =
    previousRevenue > 0
      ? ((totalRevenue - previousRevenue) / previousRevenue) * 100
      : ((totalRevenue - previousRevenue) / 1) * 100;
  const profitGrowth =
    previousProfit > 0
      ? ((totalProfit - previousProfit) / previousProfit) * 100
      : ((totalProfit - previousProfit) / 1) * 100;
  const studentGrowth =
    previousStudents > 0
      ? ((totalStudents - previousStudents) / previousStudents) * 100
      : ((totalStudents - previousStudents) / 1) * 100;
  const enrollmentGrowth =
    previousEnrollments > 0
      ? ((totalEnrollments - previousEnrollments) / previousEnrollments) * 100
      : ((totalEnrollments - previousEnrollments) / 1) * 100;
  const avgPaymentGrowth =
    previousAvgPayment > 0
      ? ((averagePayment - previousAvgPayment) / previousAvgPayment) * 100
      : ((averagePayment - previousAvgPayment) / 1) * 100;
  const avgProfitGrowth =
    previousAvgProfit > 0
      ? ((averageProfit - previousAvgProfit) / previousAvgProfit) * 100
      : ((averageProfit - previousAvgProfit) / 1) * 100;

  return {
    totalRevenue,
    totalProfit,
    totalStudents,
    totalEnrollments,
    averagePayment,
    averageProfit,
    revenueGrowth,
    profitGrowth,
    studentGrowth,
    enrollmentGrowth,
    avgPaymentGrowth,
    avgProfitGrowth,
  };
}

async function generateTrendData(
  payments: PaymentWithParts[],
  startDate: Date | undefined,
  endDate: Date,
  filterType: string
) {
  const revenueAndProfit: Array<{
    period: string;
    revenue: number;
    profit: number;
  }> = [];
  const enrollments: Array<{ period: string; enrollments: number }> = [];

  // Handle "all" → fallback to earliest payment date if no startDate provided
  if (!startDate) {
    if (payments.length === 0) {
      return { revenueAndProfit, enrollments };
    }
    startDate = new Date(
      Math.min(...payments.map((p) => new Date(p.enrollmentDate).getTime()))
    );
  }

  if (filterType === "timeRange" || filterType === "dateRange") {
    const daysDiff = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff <= 31) {
      // Daily aggregation
      for (let i = 0; i <= daysDiff; i++) {
        const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        const dayPayments = payments.filter((p) => {
          const paymentDate = new Date(p.enrollmentDate);
          return paymentDate.toDateString() === date.toDateString();
        });

        revenueAndProfit.push({
          period: format(date, "MMM dd"),
          revenue: dayPayments.reduce((sum, p) => sum + p.payment, 0),
          profit: dayPayments.reduce((sum, p) => sum + p.netProfit, 0),
        });

        enrollments.push({
          period: format(date, "MMM dd"),
          enrollments: dayPayments.length,
        });
      }
    } else {
      // Monthly aggregation
      const months = eachMonthOfInterval({ start: startDate, end: endDate });
      for (const month of months) {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const monthPayments = payments.filter((p) => {
          const paymentDate = new Date(p.enrollmentDate);
          return paymentDate >= monthStart && paymentDate <= monthEnd;
        });

        revenueAndProfit.push({
          period: format(month, "MMM yyyy"),
          revenue: monthPayments.reduce((sum, p) => sum + p.payment, 0),
          profit: monthPayments.reduce((sum, p) => sum + p.netProfit, 0),
        });

        enrollments.push({
          period: format(month, "MMM yyyy"),
          enrollments: monthPayments.filter((p) =>
            isWithinInterval(new Date(p.enrollmentDate), {
              start: monthStart,
              end: monthEnd,
            })
          ).length,
        });
      }
    }
  } else {
    // For "month" filter (daily inside that month)
    const monthStart = startDate;
    const monthEnd = endDate;
    const daysInMonth = Math.ceil(
      (monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    for (let i = 0; i <= daysInMonth; i++) {
      const date = new Date(monthStart.getTime() + i * 24 * 60 * 60 * 1000);
      const dayPayments = payments.filter((p) => {
        const paymentDate = new Date(p.enrollmentDate);
        return paymentDate.toDateString() === date.toDateString();
      });

      revenueAndProfit.push({
        period: format(date, "dd"),
        revenue: dayPayments.reduce((sum, p) => sum + p.payment, 0),
        profit: dayPayments.reduce((sum, p) => sum + p.netProfit, 0),
      });

      enrollments.push({
        period: format(date, "dd"),
        enrollments: dayPayments.length,
      });
    }
  }

  return { revenueAndProfit, enrollments };
}

async function getDistributions(payments: PaymentWithParts[]) {
  // Payment status distribution
  const statusCounts = payments.reduce((acc, payment) => {
    acc[payment.paymentStatus] = (acc[payment.paymentStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const paymentStatus = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Revenue and profit by source
  const sourceData = payments.reduce((acc, payment) => {
    if (!acc[payment.source]) {
      acc[payment.source] = { revenue: 0, profit: 0 };
    }
    acc[payment.source].revenue += payment.payment;
    acc[payment.source].profit += payment.netProfit;
    return acc;
  }, {} as Record<string, { revenue: number; profit: number }>);

  const revenueAndProfitBySource = Object.entries(sourceData)
    .map(([source, data]) => ({
      source,
      revenue: data.revenue,
      profit: data.profit,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Top colleges
  const collegeData = payments.reduce((acc, payment) => {
    if (!acc[payment.collegeName]) {
      acc[payment.collegeName] = { revenue: 0, students: 0 };
    }
    acc[payment.collegeName].revenue += payment.payment;
    acc[payment.collegeName].students += 1;
    return acc;
  }, {} as Record<string, { revenue: number; students: number }>);

  const topColleges = Object.entries(collegeData)
    .map(([college, data]) => ({
      college,
      revenue: data.revenue,
      students: data.students,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Top qualification
  const qualificationData = payments.reduce((acc, payment) => {
    if (!acc[payment.qualification]) {
      acc[payment.qualification] = { revenue: 0, netProfit: 0, students: 0 };
    }
    acc[payment.qualification].revenue += payment.payment;
    acc[payment.qualification].students += 1;
    acc[payment.qualification].netProfit += payment.netProfit;
    return acc;
  }, {} as Record<string, { revenue: number; students: number; netProfit: number }>);

  const topQualifications = Object.entries(qualificationData)
    .map(([qualification, data]) => ({
      qualification,
      revenue: data.revenue,
      students: data.students,
      netProfit: data.netProfit,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  return {
    paymentStatus,
    revenueAndProfitBySource,
    topColleges,
    topQualifications,
  };
}

function generateInsights(payments: PaymentWithParts[], overview: any) {
  const insights = [];

  // Revenue growth insight
  if (overview.revenueGrowth > 10) {
    insights.push({
      type: "positive" as const,
      title: "Strong Revenue Growth",
      description:
        "Your revenue is growing significantly compared to the previous period.",
      value: `+${overview.revenueGrowth.toFixed(1)}%`,
    });
  } else if (overview.revenueGrowth < -10) {
    insights.push({
      type: "negative" as const,
      title: "Revenue Decline",
      description:
        "Revenue has decreased compared to the previous period. Consider reviewing your strategy.",
      value: `${overview.revenueGrowth.toFixed(1)}%`,
    });
  }

  // Profit margin insight
  const profitMargin =
    overview.totalRevenue > 0
      ? (overview.totalProfit / overview.totalRevenue) * 100
      : 0;

  if (profitMargin > 20) {
    insights.push({
      type: "positive" as const,
      title: "Healthy Profit Margins",
      description:
        "Your profit margins are strong, indicating efficient operations.",
      value: `${profitMargin.toFixed(1)}%`,
    });
  } else if (profitMargin < 5) {
    insights.push({
      type: "negative" as const,
      title: "Low Profit Margins",
      description:
        "Consider optimizing costs or increasing prices to improve profitability.",
      value: `${profitMargin.toFixed(1)}%`,
    });
  }

  // Enrollment growth insight
  if (overview.enrollmentGrowth > 15) {
    insights.push({
      type: "positive" as const,
      title: "High Enrollment Growth",
      description: "New enrollments are significantly up this period.",
      value: `+${overview.enrollmentGrowth.toFixed(1)}%`,
    });
  }

  // Payment status insight
  const installmentPayments = payments.filter((p) =>
    p.paymentStatus.toLowerCase().includes("installment")
  );
  const installmentRate =
    payments.length > 0
      ? (installmentPayments.length / payments.length) * 100
      : 0;

  if (installmentRate > 60) {
    insights.push({
      type: "neutral" as const,
      title: "High Installment Rate",
      description:
        "Many students are on installment plans. Monitor collection closely.",
      value: `${installmentRate.toFixed(1)}%`,
    });
  }

  // Average payment insight
  if (overview.averagePayment > 50000) {
    insights.push({
      type: "positive" as const,
      title: "High-Value Students",
      description: "You're attracting students with higher course fees.",
      value: `$${overview.averagePayment.toLocaleString()}`,
    });
  }

  return insights;
}
