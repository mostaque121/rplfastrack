import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { DashboardHeader } from "./components/dashboard/dashboard-header";
import { DashboardShell } from "./components/dashboard/dashboard-shell";
import { DashboardSidebar } from "./components/dashboard/dashboard-sidebar";

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
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <main>
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
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </main>
  );
}
