"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomDropdownProps {
  label: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

export default function CustomDropdown({ label, options, onSelect }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full md:w-40" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center p-3.5 border-2 rounded-xl text-sm font-bold transition-all ${
          isOpen ? 'border-yellow-500 text-yellow-500' : 'border-gray-200 text-gray-700 hover:border-yellow-500'
        }`}
      >
        {label}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onSelect(opt.value); setIsOpen(false); }}
              className="w-full text-left p-3 text-sm text-gray-700 hover:bg-yellow-500 hover:text-black transition-colors border-b border-gray-100 last:border-0 font-medium"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}