import type { Metadata } from "next";
import { Outfit, Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; 
import StoreProvider from "@/store/StoreProvider";

const outfit = Outfit({ subsets: ['latin'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoWheel - Smart Vehicle Booking Platform",
  description: "A small Vehicle Booking Platform built with Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${outfit.className} min-h-screen flex flex-col antialiased`}>
        <StoreProvider>
          <AuthProvider>
            <Topbar />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}