import type { Metadata } from "next";
import { Outfit, Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";
import Topbar from "@/components/common/Topbar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/core/context/AuthContext"; 
import StoreProvider from "@/core/store/StoreProvider";
import GlobalAuthManager from "../components/auth/GlobalAuthManager";

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} min-h-screen flex flex-col antialiased`}>
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
      </body>
    </html>
  );
}