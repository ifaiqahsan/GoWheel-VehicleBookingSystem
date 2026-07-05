"use client";

import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Topbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const hoverStyle = "transition-colors duration-300 hover:text-yellow-500 cursor-pointer";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if (!isVisible) return null;

  return (
    <div className="bg-gray-900 text-white py-4 text-xs transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="flex gap-4 items-center">
          <a 
            href="https://www.google.com/maps/search/?api=1&query=E-31,+Street+5,+Ali+View+Park,+Bedian+Road,+Lahore,+Pakistan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`flex items-center gap-1 ${hoverStyle}`}
          >
            <MapPin size={16} /> E-31, Street 5, Ali View Park, Bedian Road, Lahore, Pakistan
          </a>
        </div>
        
        <div className="flex">
          <button className={`px-3 border-r border-gray-700 ${hoverStyle}`}>EN</button>
          <button className={`px-3 border-r border-gray-700 ${hoverStyle}`}>FR</button>
          <button className={`pl-3 ${hoverStyle}`}>ES</button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;