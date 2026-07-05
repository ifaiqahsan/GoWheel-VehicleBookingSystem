"use client";

import { useAuth } from "@/core/context/AuthContext";
import AuthModel from "./AuthModel";

export default function GlobalAuthManager({ children }: { children: React.ReactNode }) {
  const { isAuthOpen, setAuthOpen } = useAuth();
  return (
    <>
      {children}
      <AuthModel isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}