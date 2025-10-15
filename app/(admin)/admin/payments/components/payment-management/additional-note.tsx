"use client";

import { updatePaymentNote } from "@/app/(admin)/action/payments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PaymentNoteEditorProps {
  paymentId: string;
  initialNote: string;
  onSuccess?: () => void;
}

export function PaymentNoteEditor({
  paymentId,
  initialNote,
  onSuccess,
}: PaymentNoteEditorProps) {
  const [note, setNote] = useState<string>(initialNote ?? "");
  const [savedNote, setSavedNote] = useState<string>(initialNote ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await updatePaymentNote(paymentId, note);

      if (res.success) {
        setSavedNote(note); // reset baseline after successful save
        toast.success("Note updated successfully!");
        onSuccess?.();
      } else {
        toast.error(res.error || "Failed to update note");
      }
    } catch (err) {
      toast.error("Something went wrong while saving");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNote(savedNote); // reset to last saved note
  };

  const hasChanged = note !== savedNote;

  return (
    <div className="space-y-3 w-full">
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter additional notes..."
        className="min-h-[100px] w-full"
        disabled={loading}
        aria-label="Additional notes"
      />

      {hasChanged && (
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
