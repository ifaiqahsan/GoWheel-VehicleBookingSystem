"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserProfile = {
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
};

type AuthContextType = {
  isAuthOpen: boolean;
  setAuthOpen: (open: boolean) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("gowheel_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleSetUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      sessionStorage.setItem("gowheel_user", JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem("gowheel_user");
    }
  };

  const logout = () => {
    handleSetUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthOpen, setAuthOpen, user, setUser: handleSetUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};