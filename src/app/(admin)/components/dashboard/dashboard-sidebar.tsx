"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { DashboardNav } from "./dashboard-nav";
import { NavUser } from "./nav-user";
export function DashboardSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              asChild
              tooltip={"Home"}
            >
              <Link href={"/"}>
                <Image
                  src={"/fav.png"}
                  alt="logo-admin"
                  width={50}
                  height={50}
                  className="w-5 h-5 !size-5"
                />
                <span className="text-base font-semibold">RPLFASTRACK</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <DashboardNav />
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
