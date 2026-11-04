"use client";

import {
  ChartNoAxesCombined,
  FilePlus,
  FolderTree,
  FileText,
  Globe,
  Inbox,
  LayoutDashboard,
  Star,
  Users,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "Leads", icon: Inbox, href: "/admin/leads" },
  { title: "Analytics", icon: ChartNoAxesCombined, href: "/admin/web-analytics" },
  { title: "Courses", icon: Globe, href: "/admin/content/courses" },
  { title: "Sections", icon: FolderTree, href: "/admin/content/sections" },
  { title: "Reviews", icon: Star, href: "/admin/content/reviews" },
  { title: "Redirects", icon: Waypoints, href: "/admin/content/redirects" },
  { title: "Invoices", icon: FileText, href: "/admin/invoice" },
  { title: "Create Invoice", icon: FilePlus, href: "/admin/invoice/create" },
  { title: "Team", icon: Users, href: "/admin/users" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                <Link prefetch={false} href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
