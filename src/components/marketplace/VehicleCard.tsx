"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function VehicleCard({ vehicle }: { vehicle: any }) {
  // Determine if the vehicle is for rent or for sale
  const isRent = vehicle.listingType === 'rent';

  // Safely extract specs, default to an empty object
  const specs = vehicle.specs || {};

  // Map the specs object to items for rendering
  // This dynamically takes any key/value pair inside your specs object
  const specItems = Object.entries(specs).map(([key, value]) => ({
    label: key,
    value: value as string,
  }));

  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:border-yellow-500 transition-all group">
      {/* Vehicle Image and Category Badge */}
      <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-900 mb-4">
        <Image
          src={vehicle.img}
          alt={vehicle.model}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Dynamic Category Badge */}
        <span className="absolute top-4 left-4 bg-yellow-500 text-black text-[11px] font-black px-3 py-1 rounded-full uppercase z-10">
          {vehicle.type}
        </span>
      </div>

      {/* Model Name */}
      <h3 className="text-xl font-black text-gray-900 mb-4 truncate">{vehicle.model}</h3>

      {/* Dynamic Specs Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {specItems.map((spec) => (
          <div key={spec.label} className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">{spec.label}</span>
              <span className="font-bold text-xs text-gray-800">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-100 rounded-xl p-3 mb-4 text-center">
        <p className="text-[10px] text-gray-500 uppercase font-bold">
          {isRent ? "Starting From" : "Market Price"}
        </p>
        <p className="text-lg font-black text-yellow-500">
          {isRent
            ? `Rs. ${vehicle.price.toLocaleString()}`
            : `Rs. ${(vehicle.price / 1000000).toFixed(1)}M`}
        </p>
      </div>

      {/* Details Link */}
      <Link href={`/customer/marketplace/${vehicle.id}`}>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black py-3 rounded-xl transition-all active:scale-[0.98]">
          Details Now →
        </button>
      </Link>
    </div>
  );
}