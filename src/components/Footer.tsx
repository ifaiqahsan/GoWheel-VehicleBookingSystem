import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const hoverYellow = "transition-colors duration-300 hover:text-yellow-500 cursor-pointer";
  const mailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=faiqahsan60@gmail.com";

  return (
    <footer className="relative bg-gray-900 text-white pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/car-footer-bg.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#0d1a1f] bg-opacity-95 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">GoWheel</h2>
            <p className="text-gray-400 text-sm">
              Experience seamless mobility where innovation meets reliable automotive technology.
            </p>
            <div className="relative mt-4">
              <input type="email" placeholder="Your Email" className="w-full bg-[#1b2a30] border border-gray-700 p-3 rounded text-sm outline-none focus:border-yellow-500" />
              <button className="absolute right-2 top-2 bg-yellow-500 p-1 rounded text-white hover:bg-yellow-600 transition">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">QUICK LINKS</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li className={hoverYellow}><a href="/about">About Us</a></li>
              <li className={hoverYellow}><a href="/services">Our Services</a></li>
              <li className={hoverYellow}><a href="/drivers">Our Drivers</a></li>
              <li className={hoverYellow}><a href="/blog">Our Blog</a></li>
              <li className={hoverYellow}><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">SERVICES</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>Corporate Transfer</li>
              <li>Driver Service</li>
              <li>Airport Transfer</li>
              <li>Fleet Booking</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">CONTACT US</h3>
            <a href="https://www.google.com/maps/search/?api=1&query=E-31,+Street+5,+Ali+View+Park,+Bedian+Road,+Lahore,+Pakistan" target="_blank" rel="noopener noreferrer" className={`flex items-start gap-3 text-gray-400 text-sm ${hoverYellow}`}>
              <MapPin size={18} className="shrink-0" />
              <p>E-31, Street 5, Ali View Park, Bedian Road, Lahore, Pakistan</p>
            </a>
            <a href="https://wa.me/923369998642" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-gray-400 text-sm ${hoverYellow}`}>
              <Phone size={18} />
              <p>+92 336 9998642</p>
            </a>
            <a href={mailLink} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-gray-400 text-sm ${hoverYellow}`}>
              <Mail size={18} />
              <p>faiqahsan60@gmail.com</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;