"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import ReviewForm from "./form/review-form";

export default function AddReviewBtn() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeForm = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus size={18} />
        Add Review
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="min-w-[calc(100%-100px)] bg-muted ">
          <DialogHeader>
            <DialogTitle>Add Review</DialogTitle>
            <DialogDescription className="hidden">Course</DialogDescription>
          </DialogHeader>
          <ReviewForm closeForm={closeForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
