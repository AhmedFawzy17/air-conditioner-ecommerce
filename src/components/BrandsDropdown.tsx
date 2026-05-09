import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import carrierLogo from '../assets/brands/carrier-logo.png';
import sharpLogo from '../assets/brands/sharp-logo.png';
import lgLogo from '../assets/brands/lg-logo.png';
import panasonicLogo from '../assets/brands/panasonic-logo.png';
import mideaLogo from '../assets/brands/midea-logo.png';
import daikinLogo from '../assets/brands/daikin-logo.png';
import haierLogo from '../assets/brands/haier-logo.png';
import freshLogo from '../assets/brands/fresh-logo.png';
import tornadoLogo from '../assets/brands/tornado.png';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

const brands: Brand[] = [
  { id: 'carrier', name: 'Carrier', logo: carrierLogo },
  { id: 'sharp', name: 'SHARP', logo: sharpLogo },
  { id: 'lg', name: 'LG', logo: lgLogo },
  { id: 'panasonic', name: 'Panasonic', logo: panasonicLogo },
  { id: 'midea', name: 'Midea', logo: mideaLogo },
  { id: 'daikin', name: 'DAIKIN', logo: daikinLogo },
  { id: 'haier', name: 'Haier', logo: haierLogo },
  { id: 'fresh', name: 'FRESH', logo: freshLogo },
  { id: 'tornado', name: 'TORNADO', logo: tornadoLogo },
];

interface BrandsDropdownProps {
  onClose: () => void;
}

export const BrandsDropdown: React.FC<BrandsDropdownProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleBrandClick = (brandId: string) => {
    navigate(`/?brand=${brandId}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] md:w-[600px] bg-white shadow-2xl rounded-2xl border border-gray-100 p-6 z-[100] mt-1"
    >
      {/* Decorative Arrow */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 relative z-10">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => handleBrandClick(brand.id)}
            className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-blue-50/50 transition-all group border border-transparent hover:border-blue-100"
          >
            <div className="h-12 w-full flex items-center justify-center mb-3">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-[80%] object-contain group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${brand.name}&background=f3f4f6&color=3b82f6&bold=true`;
                }}
              />
            </div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">
              {brand.name}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-center">
        <button 
          onClick={() => { navigate('/'); onClose(); }}
          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
        >
          View All Products
        </button>
      </div>
    </motion.div>
  );
};
