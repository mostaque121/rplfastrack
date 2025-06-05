"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  BadgeDollarSign,
  ChartColumnStacked,
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
    title: "Web Analytics",
    icon: ChartNoAxesCombined,
    href: "/admin/web-analytics",
  },
  {
    title: "Business Overview",
    icon: ChartColumnStacked,
    href: "/admin/business-overview",
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
    title: "Payments",
    icon: BadgeDollarSign,
    href: "/admin/payments",
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
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
              >
                <Link href={item.href}>
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
