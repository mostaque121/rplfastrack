import { SidebarInset } from "@/components/ui/sidebar";
import type React from "react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarInset className="bg-background !rounded-none !m-0">
      {children}
    </SidebarInset>
  );
}
