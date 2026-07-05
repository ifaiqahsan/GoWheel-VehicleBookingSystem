"use client";

import { useState, useRef, useEffect } from 'react';
import { Search, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/core/context/AuthContext';

const Navbar = () => {
  const { setAuthOpen, user, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNavLinks = () => {
    if (isLoading) return [];
    if (!user) return [
      { name: 'Home', path: '/' }, 
      { name: 'Vehicles', path: '/vehicles' }, 
      { name: 'About Us', path: '/about' }
    ];
    if (user.role === 'seller') return [
      { name: 'Dashboard', path: '/seller/dashboard' }, 
      { name: 'My Listings', path: '/seller/listings' }
    ];
    
    return [
      { name: 'Home', path: '/' },
      { name: 'Marketplace', path: '/customer/marketplace' },
      { name: 'Bookings', path: '/customer/bookings' }
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md py-6 shadow-sm border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center px-2">
        <Link href="/" className="text-3xl font-extrabold tracking-tighter text-gray-900 w-56">
          Go<span className="text-yellow-500">Wheel</span>
        </Link>
        <ul className="flex-grow flex justify-center gap-10 font-semibold text-gray-700 text-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path}>
                <Link href={link.path} className={`transition-colors duration-200 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}`}>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="w-66 flex items-center justify-end gap-3">
          <div className="relative flex items-center bg-white rounded-full px-4 py-2.5 border border-gray-200 shadow-inner focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500 transition-all w-full">
            <Search size={20} className="text-gray-400" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-base w-full ml-3 text-gray-700 placeholder:text-gray-400" />
          </div>
          <div className="min-h-[48px] flex items-center shrink-0 relative" ref={dropdownRef}>
            {isLoading ? <div className="w-24" /> : user ? (
              <>
                <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-base hover:opacity-90 transition-opacity">
                  {user.name.charAt(0).toUpperCase()}
                </button>
                {isOpen && (
                  <div className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link href="/customer/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700"><User size={18} /> My Profile</Link>
                    <Link href="/customer/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700"><Settings size={18} /> Settings</Link>
                    <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-yellow-500"><LogOut size={18} /> Sign Out</button>
                  </div>
                )}
              </>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="bg-yellow-500 text-white px-7 py-2.5 rounded-full font-semibold hover:bg-yellow-600 text-base whitespace-nowrap shadow-md">
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;