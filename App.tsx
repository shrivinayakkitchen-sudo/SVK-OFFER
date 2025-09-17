import React from 'react';
import RestaurantInfo from './components/RestaurantInfo';
import TermsSection from './components/TermsSection';
import { WhatsAppIcon, MomoIcon, BurgerIcon, TeaIcon, RollIcon } from './components/icons';
import Logo from './components/Logo';

const App: React.FC = () => {
  const whatsappNumber = "9434320315";
  const preFilledMessage = "Hi Shri Vinayaka Kitchen, I would like to claim my 10% discount coupon!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(preFilledMessage)}`;

  return (
    <div className="relative min-h-screen bg-sky-100 overflow-hidden">
      {/* Subtle pattern overlay for texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(147, 197, 253, 0.4) 0.5px, transparent 0.5px)',
          backgroundSize: '5px 5px',
        }}
      ></div>

      {/* Decorative background icons with floating animation */}
      <MomoIcon 
        className="absolute top-4 left-4 w-24 h-24 text-sky-300/50 transform -rotate-12 animate-float"
        style={{ animationDuration: '8s' }}
      />
      <BurgerIcon 
        className="absolute top-8 right-4 w-28 h-28 text-sky-300/50 transform rotate-12 animate-float"
        style={{ animationDuration: '10s', animationDelay: '-2s' }}
      />
      <TeaIcon 
        className="absolute bottom-4 left-4 w-24 h-24 text-sky-300/50 transform rotate-6 animate-float"
        style={{ animationDuration: '9s', animationDelay: '-4s' }}
      />
      <RollIcon 
        className="absolute bottom-8 right-4 w-28 h-28 text-sky-300/50 transform -rotate-6 animate-float"
        style={{ animationDuration: '11s', animationDelay: '-1s' }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
        <header 
          className="text-center text-slate-800 animate-fade-in-up"
          style={{ animationFillMode: 'backwards' }}
        >
          <Logo className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Shri Vinayaka Kitchen</h1>
          <p className="text-slate-600 mt-2 max-w-md mx-auto">
            Your favorite veg spot with offers that make every meal better
          </p>
        </header>

        <main className="w-full max-w-md space-y-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-3 text-lg button-animate animate-fade-in-up"
            style={{ animationFillMode: 'backwards', animationDelay: '200ms' }}
          >
            <WhatsAppIcon className="w-7 h-7" />
            <span>Send Message to Get Coupon</span>
          </a>

          <RestaurantInfo />
          <TermsSection />
        </main>
      </div>
    </div>
  );
};

export default App;