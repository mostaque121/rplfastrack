"use client";

import { updatePaymentNote } from "@/app/(admin)/action/payments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentNoteEditorProps {
  paymentId: string;
  initialNote: string;
  onSuccess: () => void;
}

export function PaymentNoteEditor({
  paymentId,
  initialNote,
  onSuccess,
}: PaymentNoteEditorProps) {
  const [note, setNote] = useState<string>(initialNote ?? "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    if (note) {
      const res = await updatePaymentNote(paymentId, note);
      setLoading(false);

      if (res.success) {
        toast.success("Note updated successfully!");
        onSuccess();
      } else {
        toast.error(res.error || "Failed to update note");
      }
    }
  };

  const hasChanged = note !== initialNote;

  return (
    <div className="space-y-3 w-full">
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter additional notes..."
        className="min-h-[100px] w-full"
      />

      {hasChanged && (
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      )}
    </div>
  );
}
