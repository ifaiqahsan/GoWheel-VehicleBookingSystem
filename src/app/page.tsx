"use client";

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServiceCategories from '@/components/home/ServiceCategories';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <HeroSection />
      <ServiceCategories />
    </main>
  );
}