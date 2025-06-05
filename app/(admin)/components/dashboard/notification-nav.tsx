"use client";

import {
  getNotifications,
  markAllNotificationsAsRead,
} from "@/app/(admin)/action/notification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  Bell,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const iconMap = {
  response: MessageSquare,
  eligibility: FileText,
  system: AlertTriangle,
  default: Mail,
} as const;

type NotificationType = "response" | "eligibility" | "system";

type Notification = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  type: NotificationType;
  recipients: string[];
  readBy: string[];
};

function NotificationSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-start space-x-3 p-3 rounded-lg border"
        >
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

function NotificationTriggerSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}

export default function NotificationNav() {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAsRead, setMarkingAsRead] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = session?.user;

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;

    try {
      setError(null);
      const result = await getNotifications({
        userId: user.id,
        page: 1,
        pageSize: 10,
        unreadOnly: false,
      });
      setNotifications(result.notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [fetchNotifications, user?.id]);

  const unreadCount = notifications.filter(
    (n) => user?.id && !n.readBy.includes(user.id)
  ).length;

  const handleMarkAllAsRead = async () => {
    if (!user?.id || unreadCount === 0) return;

    setMarkingAsRead(true);
    try {
      const res = await markAllNotificationsAsRead(user.id);
      if (res.success) {
        setNotifications((prev) =>
          prev.map((notification) => ({
            ...notification,
            readBy: [...notification.readBy, user.id],
          }))
        );
      }
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    } finally {
      setMarkingAsRead(false);
    }
  };

  const getNotificationLink = (type: NotificationType): string => {
    switch (type) {
      case "eligibility":
        return "/admin/eligibility";
      case "response":
        return "/admin/response";
      case "system":
        return "/admin/system";
      default:
        return "/admin";
    }
  };

  // Show skeleton while session is loading
  if (status === "loading") {
    return <NotificationTriggerSkeleton />;
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-full hover:bg-sidebar-accent"
          aria-label={`Notifications ${
            unreadCount > 0 ? `(${unreadCount} unread)` : ""
          }`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center border-2 border-background"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] px-4 sm:w-full flex flex-col h-full">
        <SheetHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={markingAsRead}
                className="text-xs h-auto p-2 text-muted-foreground hover:text-foreground"
              >
                {markingAsRead ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Marking...
                  </>
                ) : (
                  "Mark all as read"
                )}
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1  overflow-y-auto">
          {loading ? (
            <NotificationSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchNotifications}>
                Try again
              </Button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => {
                const IconComponent =
                  iconMap[notification.type] || iconMap.default;
                const isRead = user.id && notification.readBy.includes(user.id);
                const link = getNotificationLink(notification.type);

                return (
                  <Link
                    key={notification.id}
                    href={link}
                    onClick={() => setIsOpen(false)}
                    className={`block p-3 rounded-lg border transition-colors hover:bg-accent/50 ${
                      !isRead
                        ? "bg-accent/20 border-accent"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                          !isRead
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm font-medium leading-tight ${
                              !isRead
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {notification.title}
                          </p>
                          {!isRead && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
