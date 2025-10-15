import { NavigationProgressBar } from "@/components/navigation/navigation-progress-provider";
import { RPLProvider } from "@/contexts/rpl-context";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "react-quill-new/dist/quill.snow.css";
import { getAllSections } from "./(main)/action/courses";
import { organization } from "./(main)/scheema/scheema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sections = await getAllSections();
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RPLProvider initialQualifications={sections}>
          <Suspense fallback={null}>
            <NavigationProgressBar />
            {children}
          </Suspense>
        </RPLProvider>
      </body>
    </html>
  );
}
