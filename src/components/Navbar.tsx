"use client";

import { useState } from 'react';
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { setAuthOpen, user, logout, isLoading } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bookings', path: '/bookings' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md py-5 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 relative">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-gray-900">
          Go<span className="text-yellow-500">Wheel</span>
        </Link>
        
        <ul className="flex gap-8 font-semibold text-gray-700">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-6">
          <div className="relative flex items-center">
            <Search 
              size={22} 
              className="cursor-pointer hover:text-yellow-500 text-gray-700 transition-colors" 
              onClick={() => setShowSearch(!showSearch)} 
            />
            
            {showSearch && (
              <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl p-3 shadow-xl w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <input 
                  type="text" 
                  placeholder="Search for cars..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 px-3 border border-gray-300 rounded-lg text-sm outline-none text-black bg-white focus:border-yellow-500 transition-colors"
                  autoFocus
                />
              </div>
            )}
          </div>
          
          <Link href="/cart" className="text-gray-700 hover:text-yellow-500 transition-colors">
            <ShoppingCart size={22} />
          </Link>
          
          <div className="w-[220px] flex justify-end min-h-[42px] items-center">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-yellow-500 animate-spin" />
            ) : user ? (
              <div className="flex items-center gap-4 animate-in fade-in duration-300">
                <button 
                  onClick={logout} 
                  className="text-gray-400 hover:text-red-500 bg-gray-100 p-2 rounded-full border border-gray-200 transition-all hover:bg-red-50 hover:border-red-200 group" 
                  title="Logout"
                >
                  <LogOut size={16} className="group-hover:scale-105 transition-transform" />
                </button>
                
                <span className="text-sm font-bold text-gray-700 tracking-tight lowercase select-none">
                  {user.name}
                </span>
                
                <Link href="/profile" className="w-9 h-9 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-sm shadow-md hover:bg-yellow-600 border border-yellow-600/20 transition-all transform hover:scale-105">
                  {user.name.charAt(0).toUpperCase()}
                </Link>
              </div>
            ) : (
              <button 
                onClick={() => setAuthOpen(true)} 
                className="bg-yellow-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-600 flex items-center gap-2 shadow-sm transition-all animate-in fade-in duration-300"
              >
                <User size={18} /> Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;