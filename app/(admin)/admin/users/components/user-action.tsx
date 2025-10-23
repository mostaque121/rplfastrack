"use client";

import { Role } from "@/app/generated/prisma";
import { ConfirmationDialog } from "@/components/custom-ui/confirmation-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UserActionsProps {
  userId: string;
  currentRole?: string;
  isAdmin: boolean;
  isBanned?: boolean | null;
  revalidate: () => void;
}

export default function UserActions({
  userId,
  currentRole,
  isAdmin,
  isBanned,
  revalidate,
}: UserActionsProps) {
  const [isPending, setIsPending] = useState(false);
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Role change
  const handleRoleChange = async (newRole: Role) => {
    if (isPending) return;
    try {
      setIsPending(true);
      const { data, error } = await authClient.admin.setRole({
        userId,
        role: newRole,
      });

      if (data?.user) {
        toast.success("Role updated", {
          description: `User role has been updated to ${newRole}`,
        });
        revalidate();
      }

      if (error) {
        toast.error("Error", {
          description: (error as any)?.message ?? "Failed to update role",
        });
      }
    } catch {
      toast.error("Error", { description: "Failed to update role" });
    } finally {
      setIsPending(false);
      setPopoverOpen(false);
    }
  };

  // Ban / Unban
  const handleBan = async () => {
    if (isPending) return;

    try {
      setIsPending(true);

      const { data, error } = isBanned
        ? await authClient.admin.unbanUser({ userId })
        : await authClient.admin.banUser({ userId });

      if (error)
        throw new Error((error as any)?.message || "Failed to perform action");

      if (data?.user) {
        toast.success(`User ${isBanned ? "unbanned" : "banned"}`, {
          description: `The user has been successfully ${
            isBanned ? "unbanned" : "banned"
          }.`,
        });
        revalidate();
      } else {
        toast.error("Unexpected response", {
          description: "Something went wrong.",
        });
      }
    } catch (err) {
      toast.error("Error", {
        description:
          err instanceof Error ? err.message : "Failed to update user",
      });
    } finally {
      setIsPending(false);
      setBanDialogOpen(false);
      setPopoverOpen(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (isPending) return;

    try {
      setIsPending(true);
      const { data, error } = await authClient.admin.removeUser({ userId });

      if (error)
        throw new Error((error as any)?.message || "Failed to delete user");

      if (data?.success) {
        toast.success("User deleted", {
          description: "The user has been successfully deleted.",
        });
        revalidate();
      } else {
        toast.error("Unexpected response", {
          description: "Something went wrong.",
        });
      }
    } catch (err) {
      toast.error("Error", {
        description:
          err instanceof Error ? err.message : "Failed to delete user",
      });
    } finally {
      setIsPending(false);
      setDeleteDialogOpen(false);
      setPopoverOpen(false);
    }
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-2 mx-6 w-48 space-y-1">
          {isAdmin && (
            <>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => handleRoleChange("admin")}
                disabled={currentRole === "admin" || isPending}
              >
                Set as Admin
              </Button>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => handleRoleChange("moderator")}
                disabled={currentRole === "moderator" || isPending}
              >
                Set as Moderator
              </Button>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => handleRoleChange("user")}
                disabled={currentRole === "user" || isPending}
              >
                Set as User
              </Button>

              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setBanDialogOpen(true)}
                disabled={currentRole === "user" || isPending}
              >
                {isBanned ? "Unban" : "Ban"}
              </Button>

              <Button
                variant="ghost"
                className="w-full text-left text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={isPending}
              >
                <Trash className="mr-2 h-4 w-4 inline" />
                Delete User
              </Button>
            </>
          )}
        </PopoverContent>
      </Popover>

      {/* Ban / Unban Dialog */}
      <ConfirmationDialog
        open={banDialogOpen}
        onOpenChange={setBanDialogOpen}
        onConfirm={handleBan}
        title={isBanned ? "Unban user?" : "Ban user?"}
        description={
          isBanned
            ? "This will restore the user's access."
            : "This will restrict the user's access. You can unban them later."
        }
        confirmText={isBanned ? "Unban" : "Ban"}
        cancelText="Cancel"
        confirmClassName="bg-red-500 text-white"
        cancelClassName="bg-gray-200"
      />

      {/* Delete Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete user?"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmClassName="bg-red-500 text-white"
        cancelClassName="bg-gray-200"
      />
    </>
  );
}
