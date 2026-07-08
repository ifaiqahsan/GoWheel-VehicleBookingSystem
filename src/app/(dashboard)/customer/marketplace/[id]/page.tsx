"use client";

import { notFound } from 'next/navigation';
import { mockVehicles } from '@/data/mockVehicles';
import { CheckCircle2, Share2 } from 'lucide-react';
import {
  VehicleGallery,
  VehicleSpecs,
  BookingSidebar,
  SellerCard
} from '@/components/marketplace/VehicleComponents';
import HeroSection from '@/components/marketplace/HeroSection';

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
  const vehicle = mockVehicles.find((v) => v.id === params.id);

  if (!vehicle) return notFound();

  const specs = {
    body: vehicle.type || "SUV",
    mileage: String(vehicle.price),
    fuel: "Petrol",
    year: "2024"
  };
  const features = (vehicle as { features?: string[] }).features || ['Air Conditioner', 'Digital Odometer', 'Leather Seats', 'Panoramic Moonroof'];
  const seller = (vehicle as { owner?: { name?: string; type?: string; location?: string } }).owner;
  const sellerInfo = {
    name: seller?.name || 'Premium Dealer',
    type: seller?.type || 'Authorized Dealer',
    location: seller?.location || 'Unknown'
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Header Area */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-4xl font-black text-gray-900">{vehicle.model}</h1>
            <p className="text-gray-500 font-medium">Marketplace Asset ID: {(vehicle as any).id || (vehicle as any).number}</p>
          </div>

          {/* Media Gallery */}
          <VehicleGallery mainImage={(vehicle as any).img || (vehicle as any).imageUrl} gallery={(vehicle as { gallery?: string[] }).gallery || []} />

          {/* Specs Grid */}
          <VehicleSpecs specs={specs} />

          {/* Features Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-black mb-6">FEATURES</h2>
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature: string) => (
                <div key={feature} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <CheckCircle2 size={18} className="text-yellow-500" /> {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <BookingSidebar price={vehicle.price} />
            <SellerCard seller={sellerInfo} />
          </div>
        </div>
      </div>
    </main>
  );
}