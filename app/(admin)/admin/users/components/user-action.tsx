"use client";

import { Role } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UserActionsProps {
  userId: string;
  currentRole: string;
  isAdmin: boolean;
  onRoleChange: (
    userId: string,
    newRole: Role
  ) => Promise<{ success: boolean }>;
  onDelete: (userId: string) => Promise<{ success: boolean }>;
}

export default function UserActions({
  userId,
  currentRole,
  isAdmin,
  onRoleChange,
  onDelete,
}: UserActionsProps) {
  const [isPending, setIsPending] = useState(false);

  const handleRoleChange = async (newRole: Role) => {
    if (isPending) return;

    try {
      setIsPending(true);
      await onRoleChange(userId, newRole);
      toast.success("Role updated", {
        description: `User role has been updated to ${newRole}`,
      });
    } catch {
      toast.error("Error", {
        description: "Failed to update user role",
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleDeleteClick = async () => {
    if (isPending) return;

    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        setIsPending(true);
        await onDelete(userId);
        toast.success("User deleted", {
          description: "User has been successfully deleted",
        });
      } catch {
        toast.error("Error", {
          description: "Failed to delete user",
        });
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={() => handleRoleChange("admin")}
              disabled={currentRole === "admin" || isPending}
            >
              Set as Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleRoleChange("moderator")}
              disabled={currentRole === "editor" || isPending}
            >
              Set as Moderator
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleRoleChange("user")}
              disabled={currentRole === "user" || isPending}
            >
              Set as User
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleDeleteClick}
              disabled={isPending}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete User
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
