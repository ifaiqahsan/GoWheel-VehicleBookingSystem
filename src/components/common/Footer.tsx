"use client";

import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    "Easy to Sell",
    "GoWheel Business",
    "Drive & Earn",
    "Intercity Rides"
  ];

  const socialIcons = [
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#0b1320] text-gray-400 pt-16 pb-8 select-none border-t border-gray-800">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          
          <div className="flex flex-col gap-4 lg:col-span-5">
            <span className="text-2xl font-extrabold tracking-tighter text-white">
              Go<span className="text-yellow-500">Wheel</span>
            </span>
            <p className="text-sm leading-relaxed text-gray-400 font-medium text-justify">
               Your one-stop destination for automotive solutions. Whether you are looking to buy, 
              sell, or rent a vehicle, we ensure a seamless experience with transparent pricing 
              and a range of quality vehicles.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-sm font-black uppercase tracking-wider text-white mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {services.map((service, idx) => (
                <li key={idx} className="text-gray-400 cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white mb-1">
              Contact Us
            </h4>
            
            <a 
              href="https://www.google.com/maps/search/?api=1&query=E-31,+Street+5,+Ali+View+Park,+Bedian+Road,+Lahore,+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm group transition-colors hover:text-yellow-500"
            >
              <MapPin size={18} className="text-yellow-500 shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
              <p className="leading-relaxed font-medium">
                E-31, Street 5, Ali View Park, Bedian Road, Lahore, Pakistan
              </p>
            </a>

            <a 
              href="https://wa.me/923369998642"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm group transition-colors hover:text-yellow-500 w-fit"
            >
              <Phone size={16} className="text-yellow-500 shrink-0 group-hover:scale-105 transition-transform" />
              <span className="font-medium">
                +92 336 9998642
              </span>
            </a>

            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=faiqahsan60@gmail.com&su=Inquiry%20-%20GoWheel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm group transition-colors hover:text-yellow-500 w-fit"
            >
              <Mail size={16} className="text-yellow-500 shrink-0 group-hover:scale-105 transition-transform" />
              <span className="font-medium break-all">
                faiqahsan60@gmail.com
              </span>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex gap-3">
            {socialIcons.map((soc, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-full border border-gray-700 text-gray-400 flex items-center justify-center cursor-default"
              >
                {soc.icon}
              </div>
            ))}
          </div>

          <p className="text-xs font-semibold tracking-wide text-gray-500 select-none uppercase">
            © {currentYear} GOWHEEL. All rights reserved.
          </p>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;