"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  Globe,
  LayoutDashboard,
  Mail,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Analytics",
    icon: ChartNoAxesCombined,
    href: "/admin/analytics",
  },

  {
    title: "Response",
    icon: Mail,
    href: "/admin/response",
  },
  {
    title: "Eligibility",
    icon: BadgeCheck,
    href: "/admin/eligibility",
  },

  {
    title: "Courses",
    icon: Globe,
    href: "/admin/section",
  },
  {
    title: "Review",
    icon: Star,
    href: "/admin/review",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="px-4">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
