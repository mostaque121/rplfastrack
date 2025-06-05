"use client";

import { format } from "date-fns";
import {
  Building,
  Calendar,
  CreditCard,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { PaymentWithParts } from "../../action/payments";

interface PaymentDetailsModalProps {
  payment: PaymentWithParts | null;
  open: boolean;
  onClose: () => void;
  onEdit: (payment: PaymentWithParts) => void;
}

export default function PaymentDetailsModal({
  payment,
  open,
  onClose,
  onEdit,
}: PaymentDetailsModalProps) {
  if (!payment) return null;

  const balance = payment.courseFee - payment.payment;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "installment":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Installment
          </Badge>
        );
      case "refunded":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" min-w-[calc(100%-100px)]  ">
        <DialogHeader className="mr-8">
          <DialogTitle className="flex items-center justify-between">
            Payment Details - {payment.name}
            <Button variant="outline" size="sm" onClick={() => onEdit(payment)}>
              Edit Payment
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[calc(100vh-150px)] overflow-y-auto">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">{payment.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm">{payment.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Source:</span>
                  <span className="text-sm">{payment.source}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Qualification:</span>
                  <span className="text-sm ml-2">{payment.qualification}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">College:</span>
                  <span className="text-sm ml-2">{payment.collegeName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Enrollment:</span>
                  <span className="text-sm">
                    {format(new Date(payment.enrollmentDate), "PPP")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Course Fee</p>
                  <p className="text-2xl font-bold">
                    ${payment.courseFee.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${payment.payment.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p
                    className={cn(
                      "text-2xl font-bold",
                      balance > 0
                        ? "text-red-600"
                        : balance < 0
                        ? "text-blue-600"
                        : "text-green-600"
                    )}
                  >
                    ${Math.abs(balance).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {balance > 0 ? "Due" : balance < 0 ? "Excess" : "Settled"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-2">
                    {getStatusBadge(payment.paymentStatus)}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    College Payment
                  </p>
                  <p className="text-lg font-semibold">
                    ${payment.collegePayment.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Agent Commission
                  </p>
                  <p className="text-lg font-semibold">
                    ${payment.agentCommission.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Bank Commission
                  </p>
                  <p className="text-lg font-semibold">
                    ${payment.bankCommission.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className=" text-muted-foreground">Net Profit</p>
                <p
                  className={cn(
                    "text-2xl font-bold",
                    payment.netProfit >= 0 ? "text-green-600" : "text-red-600"
                  )}
                >
                  ${payment.netProfit.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Installments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Installments</CardTitle>
              <CardDescription>
                {payment.parts.length} installment(s) recorded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payment.parts
                  .sort(
                    (a, b) =>
                      new Date(a.paidAt).getTime() -
                      new Date(b.paidAt).getTime()
                  )
                  .map((part, index) => (
                    <div
                      key={part.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">
                            ${part.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Paid on {format(new Date(part.paidAt), "PPP")}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <span className="ml-2">
                    {format(new Date(payment.createdAt), "PPP 'at' p")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="ml-2">
                    {format(new Date(payment.updatedAt), "PPP 'at' p")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
