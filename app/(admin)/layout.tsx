import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "next/navigation";
import { DashboardHeader } from "./components/dashboard/dashboard-header";
import { DashboardShell } from "./components/dashboard/dashboard-shell";
import { DashboardSidebar } from "./components/dashboard/dashboard-sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return (
    <main>
      {" "}
      <SidebarProvider>
        <div className="flex min-h-screen w-full flex-col">
          <DashboardHeader user={session.user} />
          <div className="flex relative flex-1">
            <DashboardSidebar user={session.user} />
            <DashboardShell>{children}</DashboardShell>
          </div>
        </div>
      </SidebarProvider>
      <Toaster />
    </main>
  );
}
