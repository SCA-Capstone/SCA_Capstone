import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UARK Side Channel Analysis",
  description: "Submit your jobs for side channel analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
          <EdgeStoreProvider>
            <Toaster position="bottom-center" />
            <Navbar />
              {children}
            <Footer />
          </EdgeStoreProvider>
        </body>
    </html>
  );
}
