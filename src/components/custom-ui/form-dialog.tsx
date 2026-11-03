"use client";

import * as React from "react";
import { useState } from "react";

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
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function FormDialog<T>({ children, Form, item, onSuccess }: AddBtnProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div onClick={() => setIsDialogOpen(true)}>{children}</div>

      <DialogContent className="w-full !max-w-5xl gap-0 overflow-hidden rounded-none p-0 md:w-[calc(100%-100px)] md:rounded-md">
        <DialogHeader>
          <DialogTitle className="hidden">a</DialogTitle>
          <DialogDescription className="hidden">a</DialogDescription>
        </DialogHeader>
        <div className="h-full max-h-[calc(100dvh)] overflow-y-auto px-5 pt-6 pb-60 md:max-h-[calc(100dvh-30px)] md:px-6 md:pb-12">
          <Form onCloseForm={() => setIsDialogOpen(false)} item={item} onSuccess={onSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
