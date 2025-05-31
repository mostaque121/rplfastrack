"use client";

import {
  getNotifications,
  markAllNotificationsAsRead,
} from "@/app/(admin)/action/notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  Bell,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const iconMap = {
  response: MessageSquare,
  eligibility: FileText,
  system: AlertTriangle,
  default: Mail,
};

type Notification = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  type: "response" | "eligibility";
  recipients: string[];
  readBy: string[];
};

export default function AdminSection() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState(false);
  const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      try {
        const result = await getNotifications({
          userId: user.id,
          page: 1,
          pageSize: 10,
          unreadOnly: false,
        });
        setNotifications(result.notifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user?.id]);

  if (!user) {
    return null;
  }

  const unreadCount = notifications.filter(
    (n) => !n.readBy.includes(user.id)
  ).length;

  const handleMarkAllAsRead = async () => {
    setReading(true);
    const res = await markAllNotificationsAsRead(user.id);
    if (res.success) {
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          readBy: [...notification.readBy, user.id],
        }))
      );
    }
    setReading(false);
  };

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "U";
  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(user.role === "admin" || user.role === "editor") && (
            <Link href="/admin" passHref>
              <DropdownMenuItem className="cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}

          <DropdownMenuSeparator />
          <Sheet
            open={isNotificationSheetOpen}
            onOpenChange={setIsNotificationSheetOpen}
          >
            <SheetTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsNotificationSheetOpen(true);
                }}
              >
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-auto h-5 px-1.5 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent className="w-full gap-0 h-screen overflow-y-scroll px-4 sm:w-[540px]">
              {loading ? (
                <div>
                  <SheetTitle>Notifications</SheetTitle>
                  <p>Loading...</p>
                </div>
              ) : (
                <div>
                  <SheetHeader className="px-4 p-0 py-4 gap-1">
                    <SheetTitle>Notifications</SheetTitle>
                    {unreadCount > 0 && (
                      <div>
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-xs cursor-pointer flex items-center gap-2 text-emerald-600 duration-300 transition-all hover:text-emerald-700 text-left"
                        >
                          Mark all as read{" "}
                          {reading && (
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          )}
                        </button>
                      </div>
                    )}
                  </SheetHeader>
                  <div className="space-y-2">
                    {notifications.map((notification) => {
                      const IconComponent =
                        iconMap[notification.type] || iconMap.default;
                      const read = notification.readBy.includes(user.id);
                      const link =
                        notification.type === "eligibility"
                          ? "/admin/eligibility"
                          : notification.type === "response"
                          ? "/admin/response"
                          : "/admin"; // default path or handle other types

                      return (
                        <div key={notification.id}>
                          <Link
                            href={link}
                            className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-gray-100 ${
                              !read
                                ? "bg-emerald-100 border-primary/20"
                                : "border-border bg-white"
                            }`}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                !read ? "bg-emerald-500" : "bg-muted"
                              }`}
                            >
                              <IconComponent
                                className={`h-4 w-4 ${
                                  !read ? "text-white" : "text-muted-foreground"
                                }`}
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p
                                  className={`text-sm font-medium ${
                                    !read
                                      ? "text-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                {!read && (
                                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {notification.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(
                                  new Date(notification.createdAt),
                                  { addSuffix: true }
                                )}
                              </p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
