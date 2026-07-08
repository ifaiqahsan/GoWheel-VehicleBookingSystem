"use client";
import { useState, useEffect } from 'react';
import { Car } from 'lucide-react';

const heroData = [
  { img: '/car1.jpg', top: 'MARKETPLACE',  bottom: 'ENGINEERED FOR YOUR JOURNEY' },
  { img: '/car2.jpg', top: 'MARKETPLACE',  bottom: 'ENGINEERED FOR YOUR JOURNEY' },
  { img: '/car3.jpg', top: 'MARKETPLACE',  bottom: 'ENGINEERED FOR YOUR JOURNEY' },
  { img: '/car4.jpg', top: 'MARKETPLACE',  bottom: 'ENGINEERED FOR YOUR JOURNEY' },
];

const bannerItems = ["BUYING", "SELLING", "RENTAL", "PREMIUM", "AFFORDABLE", "RATES", "BUYING"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % heroData.length);
        setIsLeaving(false);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[40vh] w-full overflow-hidden bg-black flex flex-col justify-between items-center">
      {heroData.map((data, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gray-900/50 w-full h-full" style={{ backgroundImage: `linear-gradient(rgba(0, 30, 60, 0.6), rgba(0, 30, 60, 0.6)), url(${data.img})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'multiply' }} />
        </div>
      ))}
      
      <div key={index} className={`relative z-10 w-full max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center text-white text-center transition-opacity duration-500 px-4 ${isLeaving ? 'opacity-0' : 'opacity-100'}`}>
        {/* Updated text with animation and breadcrumb */}
        <h2 className={`text-xl md:text-6xl uppercase font-extrabold anim-in-left ${isLeaving ? 'anim-out-left' : ''}`}>
            {heroData[index].top}
        </h2>
        <h1 className={`text-3xl md:text-2xl font-extrabold tracking-tight anim-in-right mt-1 ${isLeaving ? 'anim-out-right' : ''}`}>
            <span className="text-yellow-500">{heroData[index].bottom}</span>
        </h1>
      </div>

      <div className="relative z-20 bg-yellow-500 py-2 w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...bannerItems, ...bannerItems, ...bannerItems, ...bannerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 font-black text-black tracking-widest text-sm md:text-base px-10 shrink-0">
              <Car className="w-5 h-5" /> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}