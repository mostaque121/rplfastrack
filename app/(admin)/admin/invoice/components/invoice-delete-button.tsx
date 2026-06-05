"use client";

import { ConfirmationDialog } from "@/components/custom-ui/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function InvoiceDeleteButton({
  invoiceId,
  invoiceNumber,
}: {
  invoiceId: string;
  invoiceNumber: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/invoices/${invoiceId}`, {
        method: "DELETE",
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to delete invoice");
      }

      toast.success("Invoice deleted", {
        description: `Invoice ${invoiceNumber} was deleted successfully.`,
      });
      router.refresh();
    } catch (error) {
      toast.error("Delete failed", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>

      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        title="Delete invoice?"
        description={`This will permanently delete invoice ${invoiceNumber} and remove its PDF from Cloudinary.`}
        confirmText={"Delete"}
        cancelText="Cancel"
        confirmClassName="bg-red-500 text-white"
        cancelClassName="bg-gray-200"
      />
    </>
  );
}
