import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next/types";
import { DashboardSidebar } from "./components/dashboard/dashboard-sidebar";
import { SiteHeader } from "./components/dashboard/site-header";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  title: "Admin Dashboard",
  description: "Admin Dashboard - Private Area",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SessionProvider>
        <SidebarProvider>
          <DashboardSidebar />
          <SidebarInset>
            <div className="flex relative  flex-col">
              <SiteHeader />
              <div className="flex flex-1 overflow-y-auto flex-col">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </SessionProvider>
    </main>
  );
}
