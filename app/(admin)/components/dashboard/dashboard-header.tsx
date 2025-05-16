import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import type { User } from "next-auth";
import Link from "next/link";
import LogoAdmin from "./logo";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "role" | "name" | "image" | "email">;
}
export function DashboardHeader({ user }: UserAccountNavProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2  bg-sidebar px-4">
      <SidebarTrigger />
      <div className="flex w-full justify-between">
        <div className="ml-3">
          <Link href={"/"}>
            <LogoAdmin />
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage
                  src={user.image || ""}
                  alt={user.name || "User avatar"}
                />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2 space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
              <p className="text-xs text-muted-foreground">Type: {user.role}</p>
            </div>
            <DropdownMenuSeparator />
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />

                <button className="cursor-pointer" type="submit">
                  Sign Out
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
