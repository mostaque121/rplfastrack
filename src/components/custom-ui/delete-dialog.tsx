"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button"; // Import buttonVariants
import { Loader2 } from "lucide-react";
import * as React from "react";

interface DeleteDialogProps {
  children: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  isLoading: boolean;
  confirmText?: string;
  loadingText?: string;
  cancelText?: string;
}

export function DeleteDialog({
  children,
  onConfirm,
  title,
  description,
  isLoading,
  confirmText = "Delete",
  loadingText = "Deleting...",
  cancelText = "Cancel",
}: DeleteDialogProps) {
  const handleConfirmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevents any default form submission behavior
    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmClick}
            disabled={isLoading}
            className={buttonVariants({ variant: "destructive" })}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? loadingText : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
