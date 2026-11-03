"use client";

import { format } from "date-fns";
import { Building, Edit, GraduationCap, Mail, Phone, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PaymentWithParts } from "@/types/payment";

import { PaymentNoteEditor } from "./additional-note";

interface PaymentCardProps {
  payment: PaymentWithParts;
  onEdit: (payment: PaymentWithParts) => void;
  onDelete: (id: string, name: string) => void;
  onSuccess: () => void;
}

export function PaymentCard({ payment, onEdit, onDelete, onSuccess }: PaymentCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            variant="default"
            className="border-green-200 bg-green-50 text-xs font-medium text-green-700"
          >
            Paid
          </Badge>
        );
      case "installment":
        return (
          <Badge
            variant="secondary"
            className="border-yellow-200 bg-yellow-50 text-xs font-medium text-yellow-700"
          >
            Installment
          </Badge>
        );
      case "refunded":
        return (
          <Badge
            variant="destructive"
            className="border-red-200 bg-red-50 text-xs font-medium text-red-700"
          >
            Refunded
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs font-medium">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="border border-gray-200 transition-shadow duration-200 hover:shadow-md">
      <CardContent>
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{payment.name}</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(payment.paymentStatus)}
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(payment)}
                      className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(payment.id, payment.name)}
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{payment.qualification}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{payment.collegeName}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{payment.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{payment.phoneNumber}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span>
                  Source: <span className="font-medium">{payment.source}</span>
                </span>
                <span>•</span>
                <span>
                  Enrolled:{" "}
                  <span className="font-medium">
                    {format(new Date(payment.enrollmentDate), "MMM dd, yyyy")}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 px-4 py-3 md:grid-cols-3 lg:grid-cols-5">
            <div>
              <p className="mb-1 text-xs text-gray-500">Course Fee</p>
              <p className="text-sm font-semibold text-gray-900">
                ${payment.courseFee.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-gray-500">Total Paid</p>
              <p className="text-sm font-semibold text-green-600">
                ${payment.payment.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs text-gray-500">College Payment</p>
              <p className="text-sm font-semibold text-blue-600">
                ${payment.collegePayment.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-gray-500">Agent Commission</p>
              <p className="text-sm font-semibold text-orange-600">
                ${payment.agentCommission.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-gray-500">Bank Commission</p>
              <p className="text-sm font-semibold text-purple-600">
                ${payment.bankCommission.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Net Profit */}
          <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-2">
            <span className="text-sm font-medium text-green-700">Net Profit</span>
            <span className="text-lg font-bold text-green-700">
              ${payment.netProfit.toLocaleString()}
            </span>
          </div>

          {/* Installments */}
          {payment.parts.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700">
                Payment History ({payment.parts.length} installments)
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {payment.parts.map((part, index) => (
                  <div
                    key={part.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
                  >
                    <div>
                      <p className="text-xs text-gray-500">Installment {index + 1}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${part.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Paid on</p>
                      <p className="text-xs font-medium text-gray-700">
                        {format(new Date(part.paidAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <PaymentNoteEditor
              onSuccess={onSuccess}
              initialNote={payment.additionalNote ?? ""}
              paymentId={payment.id}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
