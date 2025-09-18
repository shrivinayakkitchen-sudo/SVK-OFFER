import React from 'react';
import { LocationIcon, PhoneIcon } from './icons';

export function RestaurantInfo() {
  const address = "Jamuna Lal Bajaj Road, Khalpara, Siliguri (Opp. Chandamama shop)";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div 
      className="bg-white p-6 rounded-2xl shadow-xl animate-fade-in-up transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl" 
      style={{ animationFillMode: 'backwards', animationDelay: '400ms' }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Visit Us</h3>
      <div className="space-y-3">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 text-gray-600 hover:text-red-600 transition-colors">
          <LocationIcon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
          <span className="font-semibold">{address}</span>
        </a>
        <a href="tel:+919434320315" className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors">
          <PhoneIcon className="w-5 h-5 text-red-500" />
          <span className="font-semibold">+91 9434320315</span>
        </a>
      </div>
    </div>
  );
}