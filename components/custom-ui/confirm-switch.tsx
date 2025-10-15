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
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import * as React from "react";

interface ConfirmSwitchProps {
  /** The text label displayed next to the switch. */
  label: string;
  /** The current confirmed state of the switch. */
  checked: boolean;
  /** A boolean to indicate if the confirm action is in progress. */
  isLoading: boolean;
  /**
   * A function that builds the description for the dialog.
   * It receives the upcoming state (true for 'on', false for 'off').
   */
  buildDescription: (isTurningOn: boolean) => React.ReactNode;
  /**
   * The function to call when the user confirms the action.
   * It receives the new boolean state. Can be async.
   */
  onConfirm: (newCheckedState: boolean) => void | Promise<void>;
  /** The title of the dialog. Defaults to "Are you sure?". */
  title?: string;
  /** The text for the confirm button. Defaults to "Confirm". */
  confirmText?: string;
  /** The text for the cancel button. Defaults to "Cancel". */
  cancelText?: string;
}

export function ConfirmSwitch({
  label,
  checked,
  isLoading,
  buildDescription,
  onConfirm,
  title = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmSwitchProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  // Stores the intended new state of the switch before it's confirmed.
  const [pendingCheckedState, setPendingCheckedState] = React.useState<
    boolean | undefined
  >(undefined);

  const handleCheckedChange = (newCheckedValue: boolean) => {
    // When the user clicks the switch, store the new value and open the dialog.
    setPendingCheckedState(newCheckedValue);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingCheckedState === undefined) return;
    onConfirm(pendingCheckedState);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setPendingCheckedState(undefined);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">{label}</span>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* The Switch is the trigger, but we control it programmatically */}
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Switch
            className="cursor-pointer"
            checked={checked}
            onCheckedChange={handleCheckedChange}
            disabled={isLoading}
          />
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {/* We only render the description if we have a pending state */}
            {pendingCheckedState !== undefined && (
              <AlertDialogDescription>
                {buildDescription(pendingCheckedState)}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} disabled={isLoading}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
              {/* No loading indicator needed here as the switch itself shows it */}
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
