"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HeroSection from '@/components/marketplace/HeroSection';
import MarketplaceFilter from '@/components/marketplace/MarketplaceFilter';
import VehicleCard from '@/components/marketplace/VehicleCard';
import { mockVehicles } from '@/data/mockVehicles';

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const [marketMode, setMarketMode] = useState<'BUY' | 'RENT'>('RENT');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const query = searchParams.get('query')?.toLowerCase() || '';
  const category = searchParams.get('category') || 'ALL';
  const priceRange = searchParams.get('price') || 'ALL';
  const timePeriod = searchParams.get('time') || 'ALL';

  const filteredVehicles = mockVehicles
    .filter((v) => {
      // Filter by mode (Buy/Rent)
      const matchesMode = marketMode === 'BUY' ? v.listingType === 'buy' : v.listingType === 'rent';
          const matchesQuery = v.model.toLowerCase().includes(query);
      const matchesCategory = category === 'ALL' || v.type.toUpperCase() === category;

      // Price logic: Rentals are < 1000, Purchases are > 1000
      let matchesPrice = true;
      if (priceRange === 'LOW') matchesPrice = v.price < (marketMode === 'RENT' ? 60 : 10000);
      if (priceRange === 'HIGH') matchesPrice = v.price > (marketMode === 'RENT' ? 100 : 50000);

      return matchesMode && matchesQuery && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      const dateA = new Date(((a as any).createdAt) || 0).getTime();
      const dateB = new Date(((b as any).createdAt) || 0).getTime();
      if (timePeriod === 'OLDEST') return dateA - dateB;
      return dateB - dateA; // Default Newest
    });

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Toggle Bar */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-xl flex items-center">
            {(['BUY', 'RENT'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => { setMarketMode(mode); setCurrentPage(1); }}
                className={`px-8 py-3 rounded-lg font-black uppercase text-sm transition-all ${marketMode === mode ? 'bg-yellow-500 text-black shadow-lg' : 'text-gray-500'}`}
              >
                {mode} VEHICLES
              </button>
            ))}
          </div>
        </div>

        <MarketplaceFilter />

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {paginatedVehicles.length > 0 ? (
            paginatedVehicles.map((v) => <VehicleCard key={v.id} vehicle={v} />)
          ) : (
            <p className="col-span-full text-center py-20 text-gray-500">No vehicles found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-yellow-500 text-black' : 'bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}