"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PaymentStats } from "@/type/payment";
import { AlertCircle, Building, CreditCard, DollarSign } from "lucide-react";

interface PaymentStatsProps {
  stats?: PaymentStats;
  loading: boolean;
  error?: boolean;
}

export function PaymentStatsCards({
  stats,
  loading,
  error = false,
}: PaymentStatsProps) {
  const statCards = [
    {
      title: "Total Payments",
      value: stats?.totalPayments,
      icon: CreditCard,
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-600",
      valueColor: "text-blue-900",
    },
    {
      title: "Paid",
      value: stats?.paidPayments,
      icon: Building,
      gradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-200",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-600",
      valueColor: "text-emerald-900",
    },
    {
      title: "Pending",
      value: stats?.pendingPayments,
      icon: AlertCircle,
      gradient: "from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-200",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-600",
      valueColor: "text-yellow-900",
    },
    {
      title: "Total Course Fee",
      value:
        stats?.totalCourseFee != null
          ? `$${stats.totalCourseFee.toLocaleString()}`
          : undefined,
      icon: DollarSign,
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-600",
      valueColor: "text-blue-900",
    },
    {
      title: "Total Revenue",
      value:
        stats?.totalRevenue != null
          ? `$${stats.totalRevenue.toLocaleString()}`
          : undefined,
      icon: DollarSign,
      gradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-200",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-600",
      valueColor: "text-emerald-900",
    },
    {
      title: "Total Due",
      value:
        stats?.totalCourseFee != null && stats?.totalRevenue != null
          ? `$${(stats.totalCourseFee - stats.totalRevenue).toLocaleString()}`
          : undefined,
      icon: AlertCircle,
      gradient: "from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-200",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-600",
      valueColor: "text-yellow-900",
    },
  ];

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className={`border-0 py-4 shadow-sm bg-gradient-to-br ${stat.gradient}`}
          >
            <CardContent className="p-2">
              <div className="flex items-center flex-col gap-2 justify-center">
                <div
                  className={`h-10 w-10 ${stat.iconBg} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <div className="text-center">
                  <p className={`text-xs font-medium ${stat.textColor} mb-1`}>
                    {stat.title}
                  </p>
                  {loading ? (
                    <Skeleton className="h-7 w-14 mx-auto" />
                  ) : error ? (
                    <p className="text-sm text-red-500">Error</p>
                  ) : (
                    <p className={`text-xl font-bold ${stat.valueColor}`}>
                      {stat.value ?? "—"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
