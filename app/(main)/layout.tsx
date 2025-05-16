import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { RPLProvider } from "@/components/rpl-context";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppChatButton } from "@/components/whatsapp-chat-button";
import { getAllSections } from "./action/courses";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const sections = await getAllSections();
  return (
    <main>
      <RPLProvider initialQualifications={sections}>
        <Navbar />
        <div>{children}</div>
        {whatsAppNumber && (
          <WhatsAppChatButton phoneNumber={whatsAppNumber} size="lg" />
        )}
        <Footer />
        <Toaster />
      </RPLProvider>
    </main>
  );
}
