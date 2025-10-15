"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, // 1. Import DialogTrigger
} from "@/components/ui/dialog";
import * as React from "react";
import { useState } from "react";

interface AddBtnProps<T> {
  item?: T;
  Form: React.ComponentType<{
    item?: T;
    onCloseForm: () => void;
    onSuccess?: () => void;
  }>;
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function FormDialog<T>({
  children,
  Form,
  item,
  onSuccess,
}: AddBtnProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    // 3. The Dialog now wraps everything
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* 4. Use DialogTrigger with asChild to wrap your custom button */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="md:w-[calc(100%-100px)] w-full rounded-none md:rounded-md p-0 gap-0 overflow-hidden !max-w-5xl">
        <DialogHeader>
          <DialogTitle className="hidden">a</DialogTitle>
          <DialogDescription className="hidden">a</DialogDescription>
        </DialogHeader>
        <div className="md:max-h-[calc(100dvh-30px)] px-5 md:px-6 pb-60 md:pb-12 pt-6 h-full max-h-[calc(100dvh)] overflow-y-auto">
          <Form
            onCloseForm={() => setIsDialogOpen(false)}
            item={item}
            onSuccess={onSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
