"use client";

import { createContext, useContext, useState } from 'react';
import AuthModel from '@/components/AuthModel';

const AuthContext = createContext({
  setAuthOpen: (open: boolean) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AuthContext.Provider value={{ setAuthOpen }}>
      {children}
      <AuthModel isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);