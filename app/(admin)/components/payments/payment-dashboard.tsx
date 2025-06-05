/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PaymentWithParts } from "@/type/payment";
import { Plus } from "lucide-react";
import { useState } from "react";
import PaymentManagement from "./payment-management/payment-management";
import PaymentForm from "./payments-form";

export default function PaymentDashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState<any | null>(null);

  const handleCreateNew = () => {
    setInitialFormData(null); // reset any existing data
    setIsCreateDialogOpen(true);
  };
  const handleRefetch = () => {
    setTriggerFetch((prev) => !prev);
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
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment
        </Button>
      </div>

      <div className="container mx-auto mt-12 px-4">
        <PaymentManagement onEdit={handleEdit} triggerFetch={triggerFetch} />
      </div>

      {/* Create Dialog */}
      <Dialog
        modal={true}
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      >
        <DialogContent className="w-full !max-w-6xl p-0 gap-0 overflow-hidden bg-muted">
          <DialogHeader>
            <DialogTitle className="hidden">Add Course Under</DialogTitle>
            <DialogDescription className="hidden">Course</DialogDescription>
          </DialogHeader>
          <div className="relative qualification w-full bg-white max-h-[calc(100vh-20px)] overflow-y-auto">
            <PaymentForm
              onSuccess={handleRefetch}
              closeForm={setIsCreateDialogOpen}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        modal={false}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <DialogContent
          onPointerDownOutside={(e) => {
            // Prevent dialog from closing when clicking on popover content
            const target = e.target as Element;
            if (target.closest("[data-radix-popper-content-wrapper]")) {
              e.preventDefault();
            }
          }}
          className=" !max-w-6xl w-full p-0  gap-0 overflow-hidden bg-muted"
        >
          <DialogHeader>
            <DialogTitle className="hidden">Edit Course</DialogTitle>
            <DialogDescription className="hidden">
              Edit existing course data
            </DialogDescription>
          </DialogHeader>
          <div className="relative  w-full bg-white max-h-[calc(100vh-20px)] overflow-y-auto">
            <PaymentForm
              onSuccess={handleRefetch}
              initialData={initialFormData}
              closeForm={setIsEditDialogOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
