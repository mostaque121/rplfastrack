"use client";

import {
  deletePayment,
  getPaymentStats,
  getPaymentsWithFilter,
} from "@/app/(admin)/action/payments";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PaymentStats, PaymentWithParts } from "@/type/payment";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { DeleteWarningDialog } from "./delete-warning-dialog";
import { PaymentCard } from "./payment-card";
import { PaymentFilters } from "./payment-filters";
import { PaymentStatsCards } from "./payment-stats";

interface PaymentManagementProps {
  onEdit: (payment: PaymentWithParts) => void;
  triggerFetch: boolean;
}

const generateMonthOptions = () => {
  const options = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  for (let year = currentYear - 2; year <= currentYear; year++) {
    const endMonth = year === currentYear ? currentMonth : 11;
    for (let month = 0; month <= endMonth; month++) {
      const date = new Date(year, month, 1);
      const value = format(date, "yyyy-MM");
      const label = format(date, "MMMM yyyy");
      options.push({ value, label });
    }
  }
  return options.reverse();
};

export default function PaymentManagement({
  onEdit,
  triggerFetch,
}: PaymentManagementProps) {
  const [payments, setPayments] = useState<PaymentWithParts[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [dateFilterType, setDateFilterType] = useState<"month" | "range">(
    "month"
  );
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<PaymentStats>({
    totalPayments: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    paidPayments: 0,
    averagePayment: 0,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    paymentId: string;
    studentName: string;
  }>({
    open: false,
    paymentId: "",
    studentName: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 12;
  const monthOptions = generateMonthOptions();

  const loadPayments = useCallback(async () => {
    setLoading(true);
    try {
      let dateFrom: Date | undefined;
      let dateTo: Date | undefined;

      if (dateFilterType === "month" && monthFilter !== "all") {
        const [year, month] = monthFilter.split("-");
        dateFrom = startOfMonth(
          new Date(Number.parseInt(year), Number.parseInt(month) - 1)
        );
        dateTo = endOfMonth(
          new Date(Number.parseInt(year), Number.parseInt(month) - 1)
        );
      } else if (dateFilterType === "range") {
        dateFrom = startDate;
        dateTo = endDate;
      }

      const result = await getPaymentsWithFilter({
        search: searchTerm || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
        dateFrom,
        dateTo,
        page: currentPage,
        limit: itemsPerPage,
      });

      if (result.success && result.data) {
        setPayments(result.data.payments);
        setTotalPages(result.data.pagination.totalPages);
      } else {
        setPayments([]);
        setTotalPages(1);
        toast.error("Error", {
          description: result.error || "Failed to load payments",
        });
      }
    } catch {
      setPayments([]);
      setTotalPages(1);
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  }, [
    searchTerm,
    statusFilter,
    monthFilter,
    dateFilterType,
    startDate,
    endDate,
    currentPage,
    itemsPerPage,
  ]);

  const loadStats = useCallback(async () => {
    try {
      const result = await getPaymentStats();
      if (result.success && result.data) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  }, []);

  useEffect(() => {
    loadStats();
    loadPayments();
  }, [loadPayments, loadStats, triggerFetch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, monthFilter, dateFilterType, startDate, endDate]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setMonthFilter("all");
    setDateFilterType("month");
    setStartDate(undefined);
    setEndDate(undefined);
    setCurrentPage(1);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({
      open: true,
      paymentId: id,
      studentName: name,
    });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePayment(deleteDialog.paymentId);
      if (result.success) {
        toast.success("Success", {
          description: "Payment deleted successfully",
        });
        loadPayments();
        loadStats();
        setDeleteDialog({ open: false, paymentId: "", studentName: "" });
      } else {
        toast.error("Error", {
          description: result.error || "Failed to delete payment",
        });
      }
    } catch {
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 w-full container mx-auto">
      {/* Statistics Cards */}
      <PaymentStatsCards stats={stats} />

      {/* Main Content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          {/* Filters */}
          <div className="mb-6">
            <PaymentFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              monthFilter={monthFilter}
              setMonthFilter={setMonthFilter}
              dateFilterType={dateFilterType}
              setDateFilterType={setDateFilterType}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              monthOptions={monthOptions}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Payment Cards */}
          <div className="space-y-4">
            {loading ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <PaymentCardSkeleton key={index} />
                ))}
              </>
            ) : payments.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  No payments found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              payments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  onEdit={onEdit}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-9 px-3 text-sm font-medium"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="h-9 px-3 text-sm font-medium"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Warning Dialog */}
      <DeleteWarningDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={handleDeleteConfirm}
        studentName={deleteDialog.studentName}
        isDeleting={isDeleting}
      />
    </div>
  );
}

function PaymentCardSkeleton() {
  return (
    <Card className="border border-gray-200">
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <Skeleton className="h-5 w-48" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-3 bg-gray-50 rounded-lg px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
