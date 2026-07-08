"use client";

import React, { useState } from 'react';
import {
    CheckCircle2, MessageSquare, ShieldCheck, User,
    Share2, Heart, Copy, Calendar, Clock, ChevronLeft, ChevronRight
} from 'lucide-react';

// ==========================================
// 1. VEHICLE MEDIA GALLERY
// ==========================================
export function VehicleGallery({ mainImage, gallery }: { mainImage: string; gallery: string[] }) {
    const [activeImage, setActiveImage] = useState(mainImage);
    const allImages = [mainImage, ...gallery].filter(Boolean);

    return (
        <div className="space-y-4">
            {/* Main Image Frame */}
            <div className="relative w-full h-[480px] bg-gray-900 rounded-3xl overflow-hidden group shadow-md border border-gray-100">
                <img
                    src={activeImage}
                    alt="Active Vehicle view"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:text-red-500 hover:scale-105 transition-all">
                        <Heart size={18} />
                    </button>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-thin">
                {allImages.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden snap-start border-2 transition-all ${activeImage === img ? 'border-yellow-500 scale-95 shadow-sm' : 'border-transparent hover:border-gray-300'
                            }`}
                    >
                        <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}

// ==========================================
// 2. TECH SPECS GRID
// ==========================================
export function VehicleSpecs({ specs }: { specs: Record<string, string> }) {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-extrabold mb-6">Car Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(specs).map(([key, val]) => (
                    <div key={key}>
                        <p className="text-gray-400 text-xs capitalize mb-1">{key}</p>
                        <p className="font-bold text-gray-900">{val}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ==========================================
// 3. BOOKING STICKY SIDEBAR
// ==========================================
export function BookingSidebar({ price }: { price: number }) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24 space-y-6">
            <div>
                <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">Daily Rate</span>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-5xl font-black text-gray-900">${price}</span>
                    <span className="text-gray-500 font-semibold text-sm">/ day</span>
                </div>
            </div>

            {/* Booking Date Fields */}
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Pick-up Date</label>
                        <div className="relative">
                            <input type="date" className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:border-yellow-500 transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Time</label>
                        <input type="time" className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Drop-off Date</label>
                        <input type="date" className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Time</label>
                        <input type="time" className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                </div>
            </div>

            {/* Main CTA */}
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black py-4 rounded-xl transition-all shadow-md shadow-yellow-500/20 active:scale-[0.99]">
                Rent Now
            </button>

            {/* Quick Action Matrix */}
            <div className="grid grid-cols-1 gap-2 pt-2">
                <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl font-bold transition-all text-sm shadow-sm">
                    <MessageSquare size={16} fill="white" /> Instant WhatsApp
                </button>
            </div>
        </div>
    );
}

// ==========================================
// 4. SELLER DATA CARD
// ==========================================
export function SellerCard({ seller }: { seller: { name: string; type: string; location: string } }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded-full p-0.5 shadow-sm">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-black text-gray-800 text-lg">
                        {seller?.name ? seller.name.charAt(0).toUpperCase() : <User size={20} />}
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Listed By</p>
                    <h3 className="font-black text-gray-900 text-lg flex items-center gap-1">
                        {seller?.name || "Premium Dealer"}
                        <ShieldCheck size={16} className="text-green-500 inline fill-green-50" />
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">{seller?.location || "Lahore, Pakistan"}</p>
                </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all text-sm">
                View Showroom Profile
            </button>
        </div>
    );
}
