import { siteConfig } from "@/config/site";
import { NavigationProgressBar } from "@/components/navigation/navigation-progress-provider";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Shared by (main), (admin) and (auth): keep it minimal. Data, providers and
// JSON-LD belong in the group layouts that need them.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <NavigationProgressBar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
