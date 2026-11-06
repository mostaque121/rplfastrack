import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";

import { NavigationProgressBar } from "@/components/navigation/navigation-progress-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Only the admin uses the mono font. No preload, so public pages never download it (the browser
// fetches a font only when text uses it) and it doesn't compete with the hero image.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// Display font for h1–h3 (globals.css)
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} antialiased`}
      >
        {/* Only the progress bar needs Suspense (useSearchParams). Wrapping
            children would start streaming before the page runs, so notFound()
            and redirects would be sent as 200 (soft 404). */}
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
