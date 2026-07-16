"use client";

import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
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
      { name: 'Marketplace', path: '/customer/marketplace' }
    ];
    if (user.role === 'seller') return [
      { name: 'Home', path: '/' },
      { name: 'Inventory', path: '/seller/inventory' },
      { name: 'List', path: '/seller/list' },
      { name: 'Inquiry', path: '/seller/inquiry' }
    ];
    return [
      { name: 'Home', path: '/' },
      { name: 'Marketplace', path: '/customer/marketplace' },
      { name: 'My Bookings', path: '/customer/bookings' }
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="sticky top-0 z-50 bg-white py-4 shadow-sm border-b border-gray-100">
      <div className="container mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-4">
        <Link href="/" className="text-3xl font-extrabold tracking-tighter text-gray-900">
          Go<span className="text-yellow-500">Wheel</span>
        </Link>

        <ul className="flex justify-center gap-8 font-semibold text-gray-700">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`relative py-2 transition-all duration-300 ${isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 hover:w-full'}`} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex justify-end items-center">
          <div className="relative" ref={dropdownRef}>
            {isLoading ? (
              <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-full" />
            ) : user ? (
              <>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-base shadow-md transition-all hover:shadow-lg"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                {isOpen && (
                  <div className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors">
                      <User size={16} /> My Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors">
                      <Settings size={16} /> Settings
                    </Link>
                    <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-yellow-500 font-bold transition-colors">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition-all shadow-sm"
              >
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