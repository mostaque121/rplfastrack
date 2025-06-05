"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { PaymentStats } from "@/type/payment";
import {
  AlertCircle,
  Building,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface PaymentStatsProps {
  stats: PaymentStats;
}

export function PaymentStatsCards({ stats }: PaymentStatsProps) {
  const statCards = [
    {
      title: "Total Payments",
      value: stats.totalPayments,
      icon: CreditCard,
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-600",
      valueColor: "text-blue-900",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-green-50 to-green-100",
      iconBg: "bg-green-200",
      iconColor: "text-green-600",
      textColor: "text-green-600",
      valueColor: "text-green-900",
    },
    {
      title: "Paid",
      value: stats.paidPayments,
      icon: Building,
      gradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-200",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-600",
      valueColor: "text-emerald-900",
    },
    {
      title: "Pending",
      value: stats.pendingPayments,
      icon: AlertCircle,
      gradient: "from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-200",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-600",
      valueColor: "text-yellow-900",
    },
    {
      title: "Avg Payment",
      value: `$${stats.averagePayment.toLocaleString()}`,
      icon: TrendingUp,
      gradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-200",
      iconColor: "text-purple-600",
      textColor: "text-purple-600",
      valueColor: "text-purple-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className={`border-0 shadow-sm bg-gradient-to-br ${stat.gradient}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${stat.textColor} mb-1`}>
                    {stat.title}
                  </p>
                  <p className={`text-xl font-bold ${stat.valueColor}`}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`h-10 w-10 ${stat.iconBg} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
