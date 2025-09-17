import React from 'react';

export function TermsSection() {
  return (
    <div 
      className="bg-white p-6 rounded-2xl shadow-xl animate-fade-in-up transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl" 
      style={{ animationFillMode: 'backwards', animationDelay: '600ms' }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Terms & Conditions</h3>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
        <li>Valid for dine-in customers only.</li>
        <li>Offer valid only for the coupon holder; not applicable on combos.</li>
        <li>Not valid on takeaway or packaging orders.</li>
        <li>Cannot be combined with other offers or discounts.</li>
        <li>You will receive the coupon image on WhatsApp after sending the message.</li>
        <li>For more details, please check at the counter.</li>
      </ul>
    </div>
  );
}
