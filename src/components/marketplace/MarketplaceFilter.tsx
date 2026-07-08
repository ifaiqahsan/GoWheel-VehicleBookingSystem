"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState } from 'react';
import CustomDropdown from './CustomDropdown';

export default function MarketplaceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  const handleUpdate = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "ALL") params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm flex flex-col md:flex-row gap-2">
      <div className="relative flex-grow flex items-center bg-white border border-gray-200 rounded-xl pr-2 focus-within:border-yellow-500 transition-all">
        <Search size={18} className="absolute left-4 text-gray-400" />
        <input
          type="text"
          value={query}
          placeholder="SEARCH VEHICLES..."
          className="w-full bg-transparent p-3.5 pl-12 text-gray-900 text-sm outline-none"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdate({ query })}
        />
        <button 
          onClick={() => handleUpdate({ query })}
          className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold text-xs uppercase hover:bg-yellow-600 transition-all hover:scale-105 active:scale-95"
        >
          SEARCH
        </button>
      </div>

      <CustomDropdown 
        label="CATEGORY" 
        options={[
          { label: 'MINI', value: 'MINI' },
          { label: 'SEDANS', value: 'CARS' },
          { label: 'BIKES', value: 'BIKES' },
          { label: 'SUVS', value: 'SUVS' },
          { label: 'VANS', value: 'VANS' }
        ]} 
        onSelect={(v) => handleUpdate({ category: v })} 
      />
      <CustomDropdown  // faiq ahsan 
        label="PRICE" 
        options={[
          { label: 'UNDER 5M', value: 'LOW' },
          { label: '5M - 10M', value: 'MID' },
          { label: 'ABOVE 10M', value: 'HIGH' }
        ]} 
        onSelect={(v) => handleUpdate({ price: v })} 
      />
      <CustomDropdown 
        label="TIME" 
        options={[
          { label: 'NEWEST', value: 'NEWEST' },
          { label: 'OLDEST', value: 'OLDEST' }
        ]} 
        onSelect={(v) => handleUpdate({ time: v })} 
      />
    </div>
  );
}