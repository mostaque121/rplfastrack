import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { User } from "next-auth";
import { DashboardNav } from "./dashboard-nav";
import LogoAdmin from "./logo";
import { UserAccountNav } from "./user-account-nav";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "role" | "name" | "image" | "email">;
}
export function DashboardSidebar({ user }: UserAccountNavProps) {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex flex-row items-center h-14 border-b-2 px-4">
        <SidebarTrigger />
        <div className="ml-3">
          <LogoAdmin />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <DashboardNav />
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <UserAccountNav user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
