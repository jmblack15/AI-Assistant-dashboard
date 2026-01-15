import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from '@/services/QueryProvider';
import "./globals.css";
import { AssistantModal } from "@/components/AssistantModal";
import { Footer } from "@/components/UI/Footer";
import { Navbar } from "@/components/UI/Navbar";
import { ThemeProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "funnelhot AI Assistant Dashboard",
  description: "Developed by Jose Manuel Osorio for funnelhot.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            <AssistantModal />
            <main className="min-h-[90vh]">{children}</main>
            <Footer />
          </QueryProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
