"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as React from "react";

interface AddBtnProps<T> {
  item?: T;
  Form: React.ComponentType<{
    item?: T;
    onCloseForm: () => void;
    onSuccess?: () => void;
  }>;
  onSuccess?: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditDialog<T>({
  Form,
  item,
  isOpen,
  onOpenChange,
  onSuccess,
}: AddBtnProps<T>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => {
          const target = e.target as Element;
          if (target.closest("[data-radix-popper-content-wrapper]")) {
            e.preventDefault();
          }
        }}
        className="md:w-[calc(100%-100px)] w-full rounded-none md:rounded-md p-0 gap-0 overflow-hidden !max-w-5xl"
      >
        <DialogHeader>
          <DialogTitle className="hidden">a</DialogTitle>
          <DialogDescription className="hidden">a</DialogDescription>
        </DialogHeader>
        <div className="md:max-h-[calc(100dvh-30px)] px-5 md:px-6 pb-60 md:pb-12 pt-6 h-full max-h-[calc(100dvh)] overflow-y-auto">
          <Form
            onCloseForm={() => onOpenChange(false)}
            item={item}
            onSuccess={onSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
