import type { Metadata } from "next";
import { Outfit } from 'next/font/google';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import "./globals.css";
import Topbar from "@/components/common/Topbar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/core/context/AuthContext";
import StoreProvider from "@/core/store/StoreProvider";
import GlobalAuthManager from "../components/auth/GlobalAuthManager";
import { Toaster } from 'sonner';

const outfit = Outfit({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: "GoWheel",
  description: "Your Platform for Vehicles Markert.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} min-h-screen flex flex-col antialiased`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <StoreProvider>
          <AuthProvider>
            <GlobalAuthManager>
              <Topbar />
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </GlobalAuthManager>
          </AuthProvider>
        </StoreProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}