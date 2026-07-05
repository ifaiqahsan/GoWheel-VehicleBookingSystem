"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Car, Bike, ShieldCheck, DollarSign, HandCoins, Search, TrendingUp } from "lucide-react";

interface ServiceCategory {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const ServiceCategories = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const categories: ServiceCategory[] = [
    {
      id: "1",
      tag: "BUYING",
      title: "Buy Vehicles",
      description: "Browse certified cars for sale",
      icon: <Car size={26} className="text-white group-hover:text-yellow-400 transition-colors" />,
      image: "/cars.jpg",
    },
    {
      id: "2",
      tag: "SELLING",
      title: "Sell Vehicles",
      description: "Get the best market value",
      icon: <HandCoins size={26} className="text-white group-hover:text-yellow-400 transition-colors" />,
      image: "/sell.jpg",
    },
    {
      id: "3",
      tag: "RENTAL",
      title: "Rent Vehicles",
      description: "Flexible daily/monthly plans",
      icon: <DollarSign size={26} className="text-white group-hover:text-yellow-400 transition-colors" />,
      image: "/vans.jpg",
    },
    {
      id: "4",
      tag: "PREMIUM",
      title: "Explore Luxury",
      description: "Elite performance collection",
      icon: <ShieldCheck size={26} className="text-white group-hover:text-yellow-400 transition-colors" />,
      image: "/prestige.jpg",
    },
    {
      id: "5",
      tag: "BUDGET",
      title: "Choose Economy",
      description: "Affordable city travel options",
      icon: <TrendingUp size={26} className="text-white group-hover:text-yellow-400 transition-colors" />,
      image: "/bikes.jpg",
    },
    {
      id: "6",
      tag: "QUICK",
      title: "Discover Mobility",
      description: "Fast and efficient solutions",
      icon: <Search size={26} className="text-white group-hover:text-yellow-400 transition-colors" />,
      image: "/suvs.jpg",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    
    const cardWidth = 300; 
    const currentScroll = containerRef.current.scrollLeft;
    const targetScroll = direction === "left" 
      ? currentScroll - cardWidth 
      : currentScroll + cardWidth;

    containerRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });
  };

  return (
    <section className="py-20 bg-[#f8f9fa] overflow-hidden select-none">
      <div className="container mx-auto px-4 relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-10 bg-yellow-500 rounded-full"></span>
              <p className="text-xs font-black uppercase tracking-widest text-yellow-500">Services</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-3">
              Our <span className="text-yellow-500">Services</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">
              Buy, sell, or rent—the perfect vehicle solution for you.
            </p>
          </div>        

          <div className="flex gap-4 mt-8 md:mt-0 items-center">
            <button
              onClick={() => handleScroll("left")}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-gray-900 transition-all shadow-sm hover:shadow-md active:scale-95 group"
            >
              <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-gray-900 transition-all shadow-sm hover:shadow-md active:scale-95 group"
            >
              <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 pt-4 snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[270px] md:min-w-[290px] border border-gray-200/10 rounded-[2rem] p-7 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-yellow-500/60 group snap-start cursor-pointer relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-gray-900/60 z-10 transition-colors duration-300 group-hover:bg-gray-900/75" />
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

              <div className="relative z-20 flex flex-col h-full">
                <div className="align-self-start inline-flex bg-white/10 backdrop-blur-md p-1.5 px-3 rounded-full text-[10px] font-extrabold tracking-wider text-gray-300 group-hover:bg-yellow-500 group-hover:text-gray-900 transition-colors mb-8 w-max">
                  # {category.tag}
                </div>
                
                <div className="w-16 h-16 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 group-hover:bg-yellow-500/20 group-hover:border-yellow-500/40 transition-all duration-300 shadow-sm">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-1.5 group-hover:text-yellow-400 transition-colors tracking-tight">
                  {category.title}
                </h3>
                
                <p className="text-sm font-semibold text-gray-300 tracking-wide">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-200/60 flex flex-wrap gap-x-12 gap-y-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">3</span>
            <span className="text-sm font-bold text-yellow-500 tracking-wide uppercase">Core Services</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">500+</span>
            <span className="text-sm font-bold text-yellow-500 tracking-wide uppercase">Active Listings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">24/7</span>
            <span className="text-sm font-bold text-yellow-500 tracking-wide uppercase">Support</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServiceCategories;