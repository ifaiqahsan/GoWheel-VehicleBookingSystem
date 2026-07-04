"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AuthModel from '@/components/AuthModel';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { isAuthOpen, setAuthOpen } = useAuth();

  return (
    <main className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <HeroSection />
      <AuthModel 
        isOpen={isAuthOpen} 
        onClose={() => setAuthOpen(false)} 
      />
    </main>
  );
}