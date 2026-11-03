"use client";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
export default function HeaderUser() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return <HeaderUserSkeleton />;
  }
  if (!user) {
    return null;
  }
  return (
    <div className="flex h-full items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={user.image || ""} alt={user.name || "User avatar"} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="space-y-1 p-2">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground">Type: {user.role}</p>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => authClient.signOut()}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />

            <button className="cursor-pointer" type="submit">
              Sign Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
function HeaderUserSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}
