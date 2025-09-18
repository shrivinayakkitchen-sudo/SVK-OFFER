import React, { useState } from 'react';
import { RestaurantInfo } from './components/RestaurantInfo';
import { TermsSection } from './components/TermsSection';
import { QRCodeModal } from './components/QRCodeModal';
import { Confetti } from './components/Confetti';
import { QRCodeIcon, GiftIcon, WhatsAppIcon } from './components/icons';

interface OfferDetails {
  discount: number;
  minOrder: number;
  message: string;
}

interface Offer extends OfferDetails {
  whatsappUrl: string;
}

// --- OFFER SYSTEM ---
const OFFERS: Record<string, OfferDetails> = {
  '10_99': {
    discount: 10,
    minOrder: 99,
    message: "Hi Shri Vinayaka Kitchen, I would like to claim my discount coupon!",
  }
};
const OFFER_KEYS = Object.keys(OFFERS);
const STORAGE_KEY = 'svk_offers_db';

const WHATSAPP_NUMBER = "9434320315";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // State for the coupon system
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [assignedOffer, setAssignedOffer] = useState<Offer | null>(null);

  const handleGetCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');

    try {
        const storedOffers: Record<string, string> = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        let offerKey = storedOffers[phoneNumber];

        if (!offerKey) {
            offerKey = OFFER_KEYS[Math.floor(Math.random() * OFFER_KEYS.length)];
            storedOffers[phoneNumber] = offerKey;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storedOffers));
        }

        const offerDetails = OFFERS[offerKey];
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(offerDetails.message)}`;

        setAssignedOffer({ ...offerDetails, whatsappUrl });
        setShowConfetti(true);
    } catch (err) {
        console.error("Failed to process offer:", err);
        setError("Sorry, something went wrong. Please try again.");
    }
  };
  
  const handleReset = () => {
    setAssignedOffer(null);
    setPhoneNumber('');
    setError('');
    setShowConfetti(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {showConfetti && <Confetti />}
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
        
        <header className="text-center text-slate-800 animate-fade-in-up" style={{ animationFillMode: 'backwards', animationDelay: '100ms' }}>
          <h1 className="text-4xl font-bold">Shri Vinayaka Kitchen</h1>
          <p className="text-slate-600 mt-2 max-w-md mx-auto">Your favorite veg spot with offers that make every meal better</p>
        </header>

        <main className="w-full max-w-md space-y-6">
          {!assignedOffer ? (
             <div 
              className="bg-white p-6 rounded-2xl shadow-xl animate-fade-in-up transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl" 
              style={{ animationFillMode: 'backwards', animationDelay: '300ms' }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Unlock Your Coupon!</h3>
              <p className="text-center text-slate-500 mb-4 text-sm">Enter your phone number to get a special discount.</p>
              <form onSubmit={handleGetCoupon} className="space-y-4">
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition text-center text-lg"
                  maxLength={10}
                  aria-label="Phone number for standard coupon"
                />
                 {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-sky-700 transition-all duration-300 flex items-center justify-center space-x-3 text-lg button-animate"
                >
                  <GiftIcon className="w-6 h-6" />
                  <span>Get My Coupon</span>
                </button>
              </form>
            </div>
          ) : (
            <div 
              className="bg-white p-8 rounded-2xl shadow-xl animate-fade-in-up text-center"
              style={{ animationFillMode: 'backwards', animationDelay: '200ms' }}
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Your Coupon is Unlocked!</h3>
              
              <a
                href={assignedOffer.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-3 text-lg button-animate"
              >
                <WhatsAppIcon className="w-7 h-7" />
                <span>Claim on WhatsApp</span>
              </a>

              <button onClick={handleReset} className="mt-6 w-full text-center text-sm text-slate-500 hover:text-slate-700 hover:underline">
                Not you? Use a different number.
              </button>
            </div>
          )}

          <RestaurantInfo />
          <TermsSection />
        </main>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-sky-300"
        aria-label="Show QR Code"
      >
        <QRCodeIcon className="w-8 h-8" />
      </button>

      <QRCodeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}