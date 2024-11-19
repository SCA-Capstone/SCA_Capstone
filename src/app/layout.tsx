import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { ConfigureAmplifyClientSide } from "@/components/ConfigureAmplifyClientSide";
import { ModalProvider } from "@/providers/ModalProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UARK Side Channel Analysis",
  description: "Submit your jobs for side channel analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
          <EdgeStoreProvider>
            <Toaster position="bottom-center" />
            <SupabaseProvider>
            <ModalProvider />
              <Navbar />
              <ConfigureAmplifyClientSide/>
                {children}
              <Footer />
            </SupabaseProvider>
          </EdgeStoreProvider>
        </body>
    </html>
  );
}