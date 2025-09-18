import React from 'react';
import { WhatsAppIcon } from './icons';

interface CouponCardProps {
  discount: number;
  minOrder: number;
  whatsappUrl: string;
  onReset: () => void;
}

export function CouponCard({ discount, minOrder, whatsappUrl, onReset }: CouponCardProps) {
  const isHighOffer = discount === 15;
  const gradientClass = isHighOffer
    ? 'from-red-500 to-orange-500'
    : 'from-sky-500 to-teal-400';
  const textColor = isHighOffer ? 'text-red-600' : 'text-sky-600';

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div
        className={`relative text-white rounded-2xl shadow-2xl overflow-hidden p-8 bg-gradient-to-br ${gradientClass}`}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="font-semibold">Your Special Offer</p>
            <h2 className="text-5xl font-bold tracking-tighter leading-tight mt-1">GET {discount}% OFF</h2>
          </div>
          <div className={`bg-white ${textColor} rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold text-center shadow-lg flex-shrink-0`}>
            <span className="text-sm -mb-1">on orders</span>
            <span className="text-3xl">₹{minOrder}+</span>
          </div>
        </div>
        
        <div className="relative z-10 border-t-2 border-dashed border-white/50 my-6"></div>

        <div className="relative z-10 text-center">
            <p className="font-medium">Show the message on WhatsApp at the counter to redeem.</p>
        </div>
      </div>
      
      <div className="mt-6 space-y-4 text-center">
         <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-3 text-lg button-animate"
          >
            <WhatsAppIcon className="w-7 h-7" />
            <span>Send Message to Get Coupon</span>
          </a>
          <button onClick={onReset} className="text-sm text-slate-500 hover:text-slate-700 hover:underline">
            Not you? Use a different number.
          </button>
      </div>

    </div>
  );
}
