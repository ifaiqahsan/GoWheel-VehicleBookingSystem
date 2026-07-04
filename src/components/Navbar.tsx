"use client";

import { useState } from 'react';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { setAuthOpen } = useAuth();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md py-5 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-gray-900">
          Go<span className="text-yellow-500">Wheel</span>
        </Link>
        
        {/* Restored navigation tabs */}
        <ul className="flex gap-8 font-semibold text-gray-700">
          <li className="cursor-pointer hover:text-yellow-500 transition-colors">Home</li>
          <li className="cursor-pointer hover:text-yellow-500 transition-colors">About Us</li>
          <li className="cursor-pointer hover:text-yellow-500 transition-colors">Cars</li>
          <li className="cursor-pointer hover:text-yellow-500 transition-colors">Contact</li>
        </ul>

        <div className="flex items-center gap-6">
          <Search size={22} className="cursor-pointer hover:text-yellow-500" onClick={() => setShowSearch(!showSearch)} />
          <Link href="/cart"><ShoppingCart size={22} /></Link>
          
          {/* Now correctly triggers the modal popup */}
          <button 
            onClick={() => setAuthOpen(true)} 
            className="bg-yellow-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-600 flex items-center gap-2"
          >
            <User size={18} /> Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;