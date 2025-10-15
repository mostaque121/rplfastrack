/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EditDialog } from "@/components/custom-ui/edit-dialog";
import { FormDialog } from "@/components/custom-ui/form-dialog";
import { Button } from "@/components/ui/button";
import type { PaymentWithParts } from "@/type/payment";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import PaymentManagement from "./payment-management/payment-management";
import PaymentForm from "./payments-form";

export default function PaymentDashboard() {
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState<any | null>(null);

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ["payments"] });
    queryClient.invalidateQueries({ queryKey: ["paymentStats"] });
  };

  const handleEdit = (payment: PaymentWithParts) => {
    setInitialFormData({
      id: payment.id,
      name: payment.name,
      industry: "Technology", // Optional: make dynamic if needed
      qualification: payment.qualification,
      phoneNumber: payment.phoneNumber,
      email: payment.email,
      source: payment.source,
      collegeName: payment.collegeName,
      courseFee: payment.courseFee,
      paymentStatus: payment.paymentStatus as
        | "paid"
        | "installment"
        | "refunded",
      collegePayment: payment.collegePayment,
      agentCommission: payment.agentCommission,
      bankCommission: payment.bankCommission,
      enrollmentDate: new Date(payment.enrollmentDate),
      additionalNote: payment.additionalNote,
      parts: payment.parts.map((part) => ({
        id: part.id,
        amount: part.amount,
        paidAt: new Date(part.paidAt),
      })),
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="bg-background py-6">
      <div className="flex mx-auto container px-4 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Payment</h1>
          <p className="text-muted-foreground">
            Manage and track all payment records
          </p>
        </div>
        <FormDialog Form={PaymentForm}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
        </FormDialog>
      </div>

      <div className="container mx-auto mt-12 px-4">
        <PaymentManagement onEdit={handleEdit} />
      </div>

      {/* Edit Dialog */}
      <EditDialog
        Form={PaymentForm}
        item={initialFormData}
        onSuccess={handleRefetch}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}
