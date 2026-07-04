"use client";

import { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const heroData = [
  { img: '/car1.jpg', top: 'YOUR BEST', mid: 'CAR BOOKING', bottom: 'EXPERIENCE' },
  { img: '/car2.jpg', top: 'YOUR BEST', mid: 'CAR BOOKING', bottom: 'EXPERIENCE' },
  { img: '/car3.jpg', top: 'YOUR BEST', mid: 'CAR BOOKING', bottom: 'EXPERIENCE' },
  { img: '/car4.jpg', top: 'YOUR BEST', mid: 'CAR BOOKING', bottom: 'EXPERIENCE' },
];

const bannerItems = ["AFFORDABLE", "PREMIUM", "RATES", "CAR", "RENTAL", "WORLDWIDE", "AFFORDABLE"];

const HeroSection = () => {
  const { setAuthOpen, user } = useAuth();
  const router = useRouter();
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

  const handleBookingRedirect = () => {
    if (user) {
      router.push('/booking');
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <section className="relative h-[76vh] w-full overflow-hidden bg-black flex flex-col justify-between items-center">
      {heroData.map((data, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <div 
            className="absolute inset-0 bg-gray-900/50 w-full h-full"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 30, 60, 0.6), rgba(0, 30, 60, 0.6)), url(${data.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'multiply'
            }}
          />
        </div>
      ))}
      
      <div 
        key={index} 
        className={`relative z-10 w-full max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center text-white text-center transition-opacity duration-500 px-4 ${isLeaving ? 'opacity-0' : 'opacity-100'}`}
      >
        <h2 className={`text-xl md:text-5xl uppercase font-extrabold anim-in-left ${isLeaving ? 'anim-out-left' : ''}`}>
          {heroData[index].top}
        </h2>
        <h1 className={`text-5xl md:text-8xl font-extrabold tracking-tight anim-in-right ${isLeaving ? 'anim-out-right' : ''}`}>
          CAR <span className="text-yellow-500">{heroData[index].mid.split(' ')[1]}</span>
        </h1>
        <h3 className={`text-3xl md:text-5xl font-bold mt-2 anim-in-left ${isLeaving ? 'anim-out-left' : ''}`}>
          {heroData[index].bottom}
        </h3>

        <div className="mt-6 mb-6 anim-in-up">
          <button 
            onClick={handleBookingRedirect}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-4 font-black uppercase tracking-widest transition-all rounded-full"
          >
            {user ? "Book Now" : "Book Now"}
          </button>
        </div>
      </div>

      <div className="relative z-20 bg-yellow-500 py-2 w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...bannerItems, ...bannerItems, ...bannerItems, ...bannerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 font-black text-black tracking-widest text-sm md:text-base px-10 shrink-0">
              <Car className="w-5 h-5" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;