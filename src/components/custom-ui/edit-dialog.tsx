"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

export function EditDialog<T>({ Form, item, isOpen, onOpenChange, onSuccess }: AddBtnProps<T>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => {
          const target = e.target as Element;
          if (target.closest("[data-radix-popper-content-wrapper]")) {
            e.preventDefault();
          }
        }}
        className="w-full !max-w-5xl gap-0 overflow-hidden rounded-none p-0 md:w-[calc(100%-100px)] md:rounded-md"
      >
        <DialogHeader>
          <DialogTitle className="hidden">a</DialogTitle>
          <DialogDescription className="hidden">a</DialogDescription>
        </DialogHeader>
        <div className="h-full max-h-[calc(100dvh)] overflow-y-auto px-5 pt-6 pb-60 md:max-h-[calc(100dvh-30px)] md:px-6 md:pb-12">
          <Form onCloseForm={() => onOpenChange(false)} item={item} onSuccess={onSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
